async function renderRoutePlannerPage(outlet, params, query, { renderNavbar, renderFooter }) {
  // Pre-selected state from query parameter or default to the first state (andhra-pradesh)
  let selectedStateId = query.state ? query.state : 'andhra-pradesh';
  let travelMode = 'car'; // car | bike | bus | train
  let selectedPlaces = []; // list of place IDs
  let mapInstance = null;
  let polylineInstance = null;
  let markersArray = [];

  // Speed and cost constants
  const TRAVEL_MODES = {
    car: { name: 'Car', speed: 60, costPerKm: 8, icon: 'car' },
    bike: { name: 'Motorcycle', speed: 40, costPerKm: 3, icon: 'bike' },
    bus: { name: 'Bus', speed: 45, costPerKm: 2, icon: 'bus' },
    train: { name: 'Train', speed: 80, costPerKm: 1.5, icon: 'train' }
  };

  // Render Page Layout
  renderTemplate();

  // Read preselected state and sessionStorage places on load
  const stateSelect = outlet.querySelector('#route-state-select');
  if (stateSelect) {
    stateSelect.value = selectedStateId;
    handleStateChange(selectedStateId);
  }

  // Pre-select places stored in sessionStorage
  try {
    const stored = sessionStorage.getItem('routePlaces');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        // Find which state these places belong to
        const samplePlace = getPlaceById(parsed[0]);
        if (samplePlace) {
          selectedStateId = samplePlace.stateId;
          stateSelect.value = selectedStateId;
          handleStateChange(selectedStateId);
          
          // Check checkboxes
          parsed.forEach(id => {
            const checkbox = outlet.querySelector(`#chk-place-${id}`);
            if (checkbox) checkbox.checked = true;
          });
          
          // Clear sessionStorage so it doesn't linger permanently
          sessionStorage.removeItem('routePlaces');

          // Read preselected travel mode
          const storedMode = sessionStorage.getItem('routeTravelMode');
          if (storedMode) {
            travelMode = storedMode;
            // Update mode buttons UI
            const modeBtns = outlet.querySelectorAll('.btn-mode');
            modeBtns.forEach(btn => {
              if (btn.getAttribute('data-mode') === storedMode) {
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-primary');
              } else {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-secondary');
              }
            });
            sessionStorage.removeItem('routeTravelMode');
          }

          // Generate immediately!
          setTimeout(() => {
            generateRoute();
          }, 200);
        }
      }
    }
  } catch (e) {
    console.error('Error pre-selecting session places', e);
  }

  function renderTemplate() {
    outlet.innerHTML = `
      ${renderNavbar()}
      
      <main class="page">
        <section class="section-padding container">
          <!-- Header -->
          <div class="mb-5 animate-on-scroll">
            <h1 class="text-gradient font-heading mb-2">Smart Route Planner</h1>
            <p style="color: var(--text-secondary);">Select multiple destinations inside a state to generate a customized, distance-optimized multi-day travel route.</p>
          </div>

          <!-- Two Column Content -->
          <div class="grid-3 animate-on-scroll" style="gap: var(--space-xl); align-items: start;">
            <!-- Left Sidebar Controls -->
            <div class="filter-panel" style="padding: var(--space-xl); border-radius: var(--radius-xl); border: 1px solid var(--glass-border); background: var(--bg-card); backdrop-filter: blur(20px);">
              
              <!-- State Selector -->
              <div class="mb-4">
                <label for="route-state-select" style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: var(--space-xs);">1. Select State</label>
                <select id="route-state-select" style="background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); padding: var(--space-sm) var(--space-md); font-size: var(--font-size-sm); width: 100%; cursor: pointer;">
                  ${STATES.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                </select>
              </div>

              <!-- Places Selector (Checkboxes) -->
              <div class="mb-4">
                <div class="flex-between mb-2" style="align-items: center;">
                  <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">2. Choose Destinations</label>
                  <div class="flex-center gap-2">
                    <button id="btn-select-all" style="background:none; border:none; color:var(--accent-teal); font-size:10px; font-weight:700; cursor:pointer;">All</button>
                    <span style="color:var(--text-muted); font-size:10px;">|</span>
                    <button id="btn-select-none" style="background:none; border:none; color:var(--accent-coral); font-size:10px; font-weight:700; cursor:pointer;">None</button>
                  </div>
                </div>

                <div id="route-places-checkboxes" style="max-height: 250px; overflow-y: auto; background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); padding: var(--space-sm); display: flex; flex-direction: column; gap: var(--space-sm);">
                  <!-- Dynamic checkboxes populate here -->
                </div>
              </div>

              <!-- Travel Mode Selector -->
              <div class="mb-4">
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: var(--space-xs);">3. Travel Mode</label>
                <div class="grid-2" style="gap: var(--space-xs);">
                  ${Object.entries(TRAVEL_MODES).map(([id, val]) => `
                    <button class="btn btn-mode ${id === travelMode ? 'btn-primary' : 'btn-secondary'}" data-mode="${id}" style="border-radius: var(--radius-lg); padding: var(--space-sm) var(--space-xs); font-size: 11px; font-weight: 700; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                      <i data-lucide="${val.icon}" style="width: 18px; height: 18px;"></i>
                      <span>${val.name}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Generate Action -->
              <button id="btn-generate-route" class="btn btn-primary w-full flex-center gap-2 mt-4" style="border-radius: var(--radius-lg); padding: var(--space-sm) var(--space-md); font-weight: 700; box-shadow: 0 4px 16px rgba(255, 107, 53, 0.2);">
                <i data-lucide="sparkles" style="width: 18px; height: 18px;"></i> Generate Route
              </button>
            </div>

            <!-- Right Column Map & Results Details -->
            <div style="grid-column: span 2; display: flex; flex-direction: column; gap: var(--space-xl);">
              <!-- Map Card -->
              <div style="border: 1px solid var(--glass-border); border-radius: var(--radius-2xl); overflow: hidden; background: var(--bg-card); box-shadow: var(--glass-shadow);">
                <div style="background: rgba(255,255,255,0.03); padding: var(--space-md) var(--space-lg); border-bottom: 1px solid var(--glass-border); font-size: var(--font-size-xs); font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: flex; justify-content: space-between; align-items: center;">
                  <span>Route Map</span>
                  <button id="btn-print-route" class="btn btn-secondary btn-sm flex-center gap-1" style="border-radius: var(--radius-full); font-size:10px; padding: 4px var(--space-md); display: none;">
                    <i data-lucide="printer" style="width:12px;height:12px;"></i> Print Itinerary
                  </button>
                </div>
                <div id="route-planner-map" style="width: 100%; height: 350px; background: var(--bg-primary);"></div>
              </div>

              <!-- Route Summary Card (Visible only when generated) -->
              <div id="route-summary-panel" style="display: none;">
                <!-- Summary stats and list of stops populate here -->
              </div>

              <!-- Day-wise Itinerary Card (Visible only when generated) -->
              <div id="route-itinerary-panel" style="display: none;">
                <!-- Day details populate here -->
              </div>
            </div>
          </div>
        </section>
      </main>

      ${renderFooter()}
    `;

    // Bind Controls
    const stateSelect = outlet.querySelector('#route-state-select');
    if (stateSelect) {
      stateSelect.addEventListener('change', (e) => {
        selectedStateId = e.target.value;
        handleStateChange(selectedStateId);
      });
    }

    const selectAllBtn = outlet.querySelector('#btn-select-all');
    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => {
        const checkboxes = outlet.querySelectorAll('#route-places-checkboxes input');
        checkboxes.forEach(chk => chk.checked = true);
      });
    }

    const selectNoneBtn = outlet.querySelector('#btn-select-none');
    if (selectNoneBtn) {
      selectNoneBtn.addEventListener('click', () => {
        const checkboxes = outlet.querySelectorAll('#route-places-checkboxes input');
        checkboxes.forEach(chk => chk.checked = false);
      });
    }

    const modeBtns = outlet.querySelectorAll('.btn-mode');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        });
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        
        travelMode = btn.getAttribute('data-mode');
      });
    });

    const generateBtn = outlet.querySelector('#btn-generate-route');
    if (generateBtn) {
      generateBtn.addEventListener('click', () => {
        generateRoute();
      });
    }

    const printBtn = outlet.querySelector('#btn-print-route');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Initialize Map
    initMap();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function initMap() {
    const mapDiv = document.getElementById('route-planner-map');
    if (!mapDiv) return;

    if (typeof L === 'undefined') {
      console.error('Leaflet is not loaded.');
      return;
    }

    mapInstance = L.map('route-planner-map', {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);
  }

  function handleStateChange(stateId) {
    const listDiv = document.getElementById('route-places-checkboxes');
    if (!listDiv) return;

    const places = getPlacesByState(stateId);

    if (places.length === 0) {
      listDiv.innerHTML = `<p style="font-size: var(--font-size-xs); color: var(--text-muted); text-align: center; padding: var(--space-md);">No places mapped for this state yet.</p>`;
      return;
    }

    listDiv.innerHTML = places.map(p => `
      <label class="flex-center" style="justify-content: flex-start; gap: var(--space-sm); font-size: var(--font-size-sm); color: var(--text-secondary); cursor: pointer;">
        <input type="checkbox" id="chk-place-${p.id}" value="${p.id}" style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--accent-saffron);">
        <span>${p.name}</span>
      </label>
    `).join('');
  }

  // Haversine formula to compute distance in km
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Nearest-Neighbor algorithm to solve the Traveling Salesman problem
  function solveTSP(placesArray) {
    if (placesArray.length <= 1) return placesArray;
    
    const unvisited = [...placesArray];
    const path = [];
    
    // Start with the first place in the selection
    let current = unvisited.shift();
    path.push(current);

    while (unvisited.length > 0) {
      let nearestIdx = 0;
      let nearestDist = Infinity;

      for (let i = 0; i < unvisited.length; i++) {
        const dist = calculateDistance(current.lat, current.lng, unvisited[i].lat, unvisited[i].lng);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      }

      current = unvisited.splice(nearestIdx, 1)[0];
      path.push(current);
    }

    return path;
  }

  async function generateRoute() {
    const checkboxes = outlet.querySelectorAll('#route-places-checkboxes input:checked');
    const selectedIds = Array.from(checkboxes).map(chk => chk.value);

    if (selectedIds.length < 2) {
      alert('Please select at least 2 destinations to plan a route.');
      return;
    }

    // Get place objects
    const placesArray = selectedIds.map(id => getPlaceById(id)).filter(Boolean);

    // Solve TSP to get optimized ordered path
    const orderedRoute = solveTSP(placesArray);

    // Compute segment distances
    const segments = [];
    let totalDistance = 0;

    for (let i = 0; i < orderedRoute.length - 1; i++) {
      const from = orderedRoute[i];
      const to = orderedRoute[i + 1];
      const dist = calculateDistance(from.lat, from.lng, to.lat, to.lng);
      segments.push({
        from: from.name,
        to: to.name,
        distance: dist
      });
      totalDistance += dist;
    }

    // Travel calculations
    const modeInfo = TRAVEL_MODES[travelMode];
    const estHours = totalDistance / modeInfo.speed;
    const estCost = totalDistance * modeInfo.costPerKm;

    // Split itinerary into days based on speed/mode
    // Car/Bus: ~250km/day, Bike: ~150km/day, Train: ~350km/day
    const maxKmPerDay = travelMode === 'bike' ? 150 : (travelMode === 'train' ? 350 : 250);
    const days = [];
    let currentDayStops = [orderedRoute[0]];
    let currentDayKm = 0;

    for (let i = 0; i < orderedRoute.length - 1; i++) {
      const segmentDist = segments[i].distance;
      if (currentDayKm + segmentDist > maxKmPerDay && currentDayStops.length >= 2) {
        // Save current day
        days.push({
          stops: [...currentDayStops],
          distance: currentDayKm
        });
        // Start next day
        currentDayStops = [orderedRoute[i], orderedRoute[i + 1]];
        currentDayKm = segmentDist;
      } else {
        currentDayStops.push(orderedRoute[i + 1]);
        currentDayKm += segmentDist;
      }
    }
    // Save last day
    if (currentDayStops.length > 0) {
      days.push({
        stops: currentDayStops,
        distance: currentDayKm
      });
    }

    // Check if we need to fetch stations for bus/train mode
    let stations = [];
    if (travelMode === 'bus' || travelMode === 'train') {
      const btn = document.getElementById('btn-generate-route');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i data-lucide="loader" style="width:18px;height:18px;animation:spin 2s linear infinite;"></i> Finding nearest stations...`;
      btn.disabled = true;
      
      try {
        const queryType = travelMode === 'bus' ? 'node[amenity=bus_station]' : 'node[railway=station]';
        const searchRadius = travelMode === 'bus' ? 5000 : 15000;
        
        stations = await Promise.all(orderedRoute.map(async (stop) => {
          const query = `[out:json];${queryType}(around:${searchRadius},${stop.lat},${stop.lng});out body 1;`;
          const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
          try {
            const res = await fetch(url);
            const data = await res.json();
            if (data && data.elements && data.elements.length > 0) {
              const st = data.elements[0];
              const dist = calculateDistance(stop.lat, stop.lng, st.lat, st.lon);
              return { ...st, distToStop: dist };
            }
          } catch(e) { console.error('Overpass API error', e); }
          return null;
        }));
      } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
        if (window.lucide) window.lucide.createIcons();
      }
    }

    // Update Map
    drawRouteOnMap(orderedRoute, stations);

    // Render summary panel
    const summaryPanel = document.getElementById('route-summary-panel');
    if (summaryPanel) {
      summaryPanel.style.display = 'block';
      summaryPanel.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-2xl); padding: var(--space-xl); backdrop-filter: blur(20px);">
          <h2 class="font-heading text-gradient mb-4" style="font-size: var(--font-size-xl);">Route Summary</h2>
          
          <!-- Statistics Grid -->
          <div class="grid-4 mb-4" style="gap: var(--space-md); border-bottom: 1px solid var(--glass-border); padding-bottom: var(--space-lg);">
            <div class="text-center">
              <span style="display:block; font-size:10px; text-transform:uppercase; color:var(--text-muted);">Total Distance</span>
              <strong style="font-size: var(--font-size-xl); color: var(--accent-saffron); font-family: var(--font-heading);">${totalDistance.toFixed(1)} km</strong>
            </div>
            <div class="text-center" style="border-left: 1px solid var(--glass-border);">
              <span style="display:block; font-size:10px; text-transform:uppercase; color:var(--text-muted);">Travel Mode</span>
              <strong style="font-size: var(--font-size-md); color: var(--accent-teal);">${modeInfo.name}</strong>
            </div>
            <div class="text-center" style="border-left: 1px solid var(--glass-border);">
              <span style="display:block; font-size:10px; text-transform:uppercase; color:var(--text-muted);">Est. Driving Time</span>
              <strong style="font-size: var(--font-size-xl); color: var(--accent-gold); font-family: var(--font-heading);">${estHours.toFixed(1)} hrs</strong>
            </div>
            <div class="text-center" style="border-left: 1px solid var(--glass-border);">
              <span style="display:block; font-size:10px; text-transform:uppercase; color:var(--text-muted);">Est. Fuel Cost</span>
              <strong style="font-size: var(--font-size-xl); color: var(--accent-coral); font-family: var(--font-heading);">₹${estCost.toFixed(0)}</strong>
            </div>
          </div>

          <!-- Stops ordered list -->
          <h3 class="mb-3 font-heading" style="font-size: var(--font-size-md); font-weight: 700;">Optimized Stop Order</h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
            ${orderedRoute.map((stop, index) => {
              const segment = index < orderedRoute.length - 1 ? segments[index] : null;
              return `
                <div class="flex-between" style="align-items: center; background: rgba(255,255,255,0.02); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-lg); border: 1px solid var(--glass-border);">
                  <div class="flex-center gap-3" style="justify-content: flex-start;">
                    <span class="flex-center font-heading" style="width: 28px; height: 28px; border-radius: var(--radius-full); background: var(--gradient-primary); color: var(--text-inverse); font-weight: 800; font-size:12px;">
                      ${index + 1}
                    </span>
                    <div>
                      <strong style="font-size: var(--font-size-sm); color: var(--text-primary);">${stop.name}</strong>
                      <span style="display:block; font-size:10px; color:var(--text-muted);">${stop.district} District</span>
                    </div>
                  </div>
                  
                  ${segment ? `
                    <div style="text-align: right;">
                      <span style="font-size: var(--font-size-xs); font-weight: 700; color: var(--accent-teal);">${segment.distance.toFixed(1)} km</span>
                      <span style="display:block; font-size: 10px; color: var(--text-muted);">to next stop</span>
                    </div>
                  ` : `
                    <span class="badge" style="background: rgba(0, 217, 163, 0.1); color: var(--accent-teal); font-size: 10px; font-weight: 700;">End of Journey</span>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Render day-by-day Itinerary panel
    const itineraryPanel = document.getElementById('route-itinerary-panel');
    if (itineraryPanel) {
      itineraryPanel.style.display = 'block';
      itineraryPanel.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-2xl); padding: var(--space-xl); backdrop-filter: blur(20px);">
          <h2 class="font-heading text-gradient mb-4" style="font-size: var(--font-size-xl);">Day-by-Day Itinerary</h2>
          
          <div style="display: flex; flex-direction: column; gap: var(--space-xl);">
            ${days.map((day, dIdx) => `
              <div class="itinerary-day" style="border: 1px solid var(--glass-border); border-radius: var(--radius-xl); padding: var(--space-lg); background: rgba(255,255,255,0.01);">
                <div class="flex-between mb-3" style="align-items: center; border-bottom: 1px solid var(--glass-border); padding-bottom: var(--space-xs);">
                  <strong class="font-heading" style="font-size: var(--font-size-md); color: var(--accent-gold);">Day ${dIdx + 1}</strong>
                  <span style="font-size: var(--font-size-xs); color: var(--text-muted); font-weight: 600;">Distance: <strong>${day.distance.toFixed(1)} km</strong></span>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: var(--space-md); position: relative;">
                  ${day.stops.map((stop, sIdx) => `
                    <div style="display: flex; gap: var(--space-md); position: relative;">
                      <div class="flex-center" style="flex-shrink: 0; width: 24px; height: 24px; border-radius: var(--radius-full); background: rgba(0, 217, 163, 0.1); border: 1px solid var(--accent-teal); color: var(--accent-teal); font-weight:700; font-size: 11px;">
                        ${String.fromCharCode(65 + sIdx)}
                      </div>
                      <div>
                        <strong style="font-size: var(--font-size-sm); color: var(--text-primary);">${stop.name}</strong>
                        <p style="font-size: var(--font-size-xs); color: var(--text-muted); line-height:1.4; margin-top:2px;">${stop.description.substring(0, 100)}...</p>
                        <div style="display:flex; gap: var(--space-sm); margin-top: var(--space-xs);">
                          <span style="font-size: 10px; color: var(--accent-gold); font-weight:600;"><i data-lucide="star" style="width:10px;height:10px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> ${stop.rating} Rating</span>
                          <span style="font-size: 10px; color: var(--accent-blue); font-weight:600;"><i data-lucide="clock" style="width:10px;height:10px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> Timings: ${stop.timings.split(',')[0]}</span>
                        </div>
                        ${stations[orderedRoute.indexOf(stop)] ? `
                          <div style="margin-top: 10px; background: rgba(0, 217, 163, 0.05); border: 1px solid rgba(0, 217, 163, 0.2); border-radius: var(--radius-sm); padding: var(--space-sm); display: flex; align-items: center; gap: var(--space-sm);">
                            <i data-lucide="${travelMode === 'bus' ? 'bus' : 'train'}" style="width: 14px; height: 14px; color: var(--accent-teal);"></i>
                            <div>
                              <div style="font-size: 11px; font-weight: 700; color: var(--text-primary);">${stations[orderedRoute.indexOf(stop)].tags?.name || 'Nearest Station'}</div>
                              <div style="font-size: 10px; color: var(--text-muted);">${stations[orderedRoute.indexOf(stop)].distToStop.toFixed(1)} km from ${stop.name}</div>
                            </div>
                            <a href="https://www.google.com/maps/dir/?api=1&destination=${stations[orderedRoute.indexOf(stop)].lat},${stations[orderedRoute.indexOf(stop)].lon}" target="_blank" style="margin-left: auto; font-size: 10px; color: var(--accent-blue); text-decoration: none; font-weight: 700;">View Map</a>
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Show print button
    const printBtn = document.getElementById('btn-print-route');
    if (printBtn) printBtn.style.display = 'inline-flex';

    // Add Navigate Full Route and Save Route buttons below itinerary
    const actionsHtml = `
      <div id="route-actions-panel" style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px;">
        <button id="btn-navigate-route" class="btn btn-primary flex-center gap-2" style="flex: 1; min-width: 200px; border-radius: var(--radius-lg); padding: 14px 24px; font-weight: 700; box-shadow: 0 4px 20px rgba(66,133,244,0.3); background: linear-gradient(135deg, #4285F4, #34A853);">
          <i data-lucide="navigation" style="width: 18px; height: 18px;"></i> Navigate Full Route
        </button>
        <button id="btn-save-route" class="btn btn-secondary flex-center gap-2" style="flex: 1; min-width: 200px; border-radius: var(--radius-lg); padding: 14px 24px; font-weight: 700;">
          <i data-lucide="bookmark" style="width: 18px; height: 18px;"></i> Save Route to Wishlist
        </button>
      </div>
    `;
    const itPanel = document.getElementById('route-itinerary-panel');
    if (itPanel) {
      itPanel.insertAdjacentHTML('afterend', actionsHtml);
    }

    // Navigate Full Route: uses Geolocation + Google Maps with waypoints
    const navigateBtn = document.getElementById('btn-navigate-route');
    if (navigateBtn) {
      navigateBtn.addEventListener('click', () => {
        navigateBtn.innerHTML = `<i data-lucide="loader" style="width:18px;height:18px;animation:spin 1s linear infinite;"></i> Getting your location...`;
        if (window.lucide) window.lucide.createIcons();

        if (!navigator.geolocation) {
          // Fallback: start from first stop
          openGoogleMapsRoute(null, orderedRoute);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            openGoogleMapsRoute({ lat: pos.coords.latitude, lng: pos.coords.longitude }, orderedRoute);
          },
          () => {
            // On error, start from first stop
            openGoogleMapsRoute(null, orderedRoute);
          },
          { timeout: 8000 }
        );
      });
    }

    // Save Route to Wishlist
    const saveRouteBtn = document.getElementById('btn-save-route');
    if (saveRouteBtn) {
      saveRouteBtn.addEventListener('click', () => {
        if (!window.YatraAuth || !window.YatraAuth.isLoggedIn()) {
          window.location.hash = '#/auth?mode=login';
          return;
        }
        const routeData = {
          id: 'route-' + Date.now(),
          name: `${STATES.find(s => s.id === selectedStateId)?.name || selectedStateId} Trip (${orderedRoute.length} stops)`,
          stops: orderedRoute.map(s => ({ id: s.id, name: s.name })),
          mode: TRAVEL_MODES[travelMode].name,
          totalDistance: totalDistance.toFixed(1),
          createdAt: new Date().toISOString()
        };
        const added = window.YatraAuth.saveRoute(routeData);
        if (added) {
          saveRouteBtn.classList.remove('btn-secondary');
          saveRouteBtn.classList.add('btn-primary');
          saveRouteBtn.innerHTML = `<i data-lucide="check" style="width: 18px; height: 18px;"></i> Route Saved!`;
          saveRouteBtn.style.background = 'linear-gradient(135deg, #00D9A3, #00B88D)';
        }
        if (window.lucide) window.lucide.createIcons();
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function openGoogleMapsRoute(userLocation, orderedRoute) {
    // Use Google Maps /dir/ format which handles multi-stop routes much better:
    // https://www.google.com/maps/dir/PlaceName1/PlaceName2/PlaceName3/...
    // Using "name, district" format for better place resolution than raw lat,lng

    const stops = [];

    // Add user location as first stop if available
    if (userLocation) {
      stops.push(`${userLocation.lat},${userLocation.lng}`);
    }

    // Add all route stops using name + district for better Google Maps resolution
    orderedRoute.forEach(p => {
      // Use the place name + state for reliable resolution
      const state = STATES.find(s => s.id === p.stateId);
      const stateName = state ? state.name : '';
      stops.push(`${p.name}, ${p.district}, ${stateName}, India`);
    });

    // Google Maps /dir/ URL - each stop separated by /
    const encodedStops = stops.map(s => encodeURIComponent(s)).join('/');
    const url = `https://www.google.com/maps/dir/${encodedStops}`;

    window.open(url, '_blank');

    // Reset button
    const navigateBtn = document.getElementById('btn-navigate-route');
    if (navigateBtn) {
      navigateBtn.innerHTML = `<i data-lucide="navigation" style="width: 18px; height: 18px;"></i> Navigate Full Route`;
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function drawRouteOnMap(orderedRoute, stations = []) {
    if (!mapInstance) return;

    // Remove existing polylines & markers
    if (polylineInstance) {
      mapInstance.removeLayer(polylineInstance);
    }
    markersArray.forEach(m => mapInstance.removeLayer(m));
    markersArray = [];

    // Extract path coordinates
    const latlngs = orderedRoute.map(p => [p.lat, p.lng]);

    // Create polyline connecting stops
    polylineInstance = L.polyline(latlngs, {
      color: '#FF6B35',
      weight: 4,
      opacity: 0.8,
      dashArray: '8, 8', // dashed style
      lineJoin: 'round'
    }).addTo(mapInstance);

    // Add numbered markers
    orderedRoute.forEach((p, idx) => {
      // Use Leaflet DivIcon for numbered markers
      const numberIcon = L.divIcon({
        className: 'route-map-number-icon',
        html: `<div style="background: linear-gradient(135deg, #FF6B35, #F7C948); color: #0A0E1A; width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: var(--font-heading); font-size: 11px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">${idx + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([p.lat, p.lng], { icon: numberIcon }).addTo(mapInstance);
      
      const popupContent = `
        <div style="font-family: var(--font-body); color: #0A0E1A; padding: var(--space-xs); max-width: 220px;">
          <h4 style="font-family: var(--font-heading); margin-bottom: 2px; font-weight: 700; color: #FF6B35; font-size: 13px;">Stop ${idx + 1}: ${p.name}</h4>
          <span style="font-size: 10px; color: #777; font-weight: 600;">${p.district} District</span>
        </div>
      `;
      marker.bindPopup(popupContent);
      markersArray.push(marker);
    });

    // Add station markers if available
    stations.forEach((st, idx) => {
      if (st) {
        const iconColor = travelMode === 'bus' ? '#00D9A3' : '#4285F4';
        const stIcon = L.divIcon({
          className: 'station-marker',
          html: `<div style="background:${iconColor}; width:18px; height:18px; border-radius:50%; border:2px solid white; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.3);"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="${travelMode==='bus'?'M4 14h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6zm0-10h16a2 2 0 0 1 2 2v8H2V6a2 2 0 0 1 2-2zm4 14h.01M16 14h.01M6 4h12M8 4V2m8 2V2':'M4 14h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6zm0-10h16a2 2 0 0 1 2 2v8H2V6a2 2 0 0 1 2-2zm4 14h.01M16 14h.01M6 4h12M8 4V2m8 2V2'}"/></svg></div>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });
        const stMarker = L.marker([st.lat, st.lon], { icon: stIcon }).addTo(mapInstance);
        stMarker.bindPopup(`<div style="font-family:var(--font-body); font-size:12px;"><strong>${st.tags?.name || 'Station'}</strong><br>${st.distToStop.toFixed(1)} km from ${orderedRoute[idx].name}</div>`);
        markersArray.push(stMarker);
      }
    });

    // Fit bounds to show the entire route
    const group = new L.featureGroup(markersArray);
    mapInstance.fitBounds(group.getBounds().pad(0.2));
  }
}
window.renderRoutePlannerPage = renderRoutePlannerPage;
