async function renderPlacePage(outlet, params, query, { renderNavbar, renderFooter }) {
  const placeId = params.id;
  const place = getPlaceById(placeId);

  if (!place) {
    outlet.innerHTML = `
      ${renderNavbar()}
      <main class="page flex-center section-padding" style="min-height:70vh;">
        <div class="text-center">
          <h2 class="text-gradient mb-3">Destination Not Found</h2>
          <p class="mb-4">We are currently mapping new places across India. Let's find another destination!</p>
          <a href="#/explore" class="btn btn-primary">Back to Explore</a>
        </div>
      </main>
      ${renderFooter()}
    `;
    return;
  }

  const state = STATES.find(s => s.id === place.stateId);
  const cat = CATEGORIES.find(c => c.id === place.category);
  const nearbyPlaces = getNearbyPlaces(placeId);

  // Generate stars
  const stars = Array(5).fill(0).map((_, i) => 
    `<i data-lucide="star" style="width: 18px; height: 18px; fill: ${i < Math.floor(place.rating) ? 'var(--accent-gold)' : 'none'}; color: var(--accent-gold);"></i>`
  ).join('');

  outlet.innerHTML = `
    ${renderNavbar()}
    
    <!-- Fullscreen Map Modal -->
    <div id="fullscreen-map-modal" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.92); backdrop-filter:blur(10px);">
      <div style="position:absolute; top:0; left:0; right:0; z-index:10001; display:flex; justify-content:space-between; align-items:center; padding:16px 24px; background:linear-gradient(180deg, rgba(10,14,26,0.95) 0%, transparent 100%);">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:10px; height:10px; border-radius:50%; background:var(--accent-saffron); animation:pulse 2s infinite;"></div>
          <h3 style="font-family:var(--font-heading); color:var(--text-primary); font-size:16px; font-weight:700; margin:0;">${place.name}</h3>
          <span style="font-size:11px; color:var(--text-muted); padding:2px 8px; background:rgba(255,255,255,0.06); border-radius:20px;">${place.district} District</span>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}" target="_blank" rel="noopener" 
             style="display:flex; align-items:center; gap:6px; padding:8px 16px; background:linear-gradient(135deg, #4285F4, #34A853); color:white; border-radius:8px; text-decoration:none; font-size:12px; font-weight:700; border:none; cursor:pointer; transition:transform 0.2s;" 
             onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            <i data-lucide="navigation" style="width:14px;height:14px;"></i> Get Directions
          </a>
          <a href="https://www.google.com/maps/@${place.lat},${place.lng},15z" target="_blank" rel="noopener"
             style="display:flex; align-items:center; gap:6px; padding:8px 16px; background:rgba(255,255,255,0.08); color:var(--text-primary); border-radius:8px; text-decoration:none; font-size:12px; font-weight:700; border:1px solid var(--glass-border); cursor:pointer; transition:transform 0.2s;"
             onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            <i data-lucide="external-link" style="width:14px;height:14px;"></i> Google Maps
          </a>
          <button id="close-fullscreen-map" style="width:40px; height:40px; border-radius:50%; background:rgba(255,107,99,0.15); border:1px solid rgba(255,107,99,0.3); color:var(--accent-coral); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" 
                  onmouseover="this.style.background='rgba(255,107,99,0.3)'" onmouseout="this.style.background='rgba(255,107,99,0.15)'">
            <i data-lucide="x" style="width:20px;height:20px;"></i>
          </button>
        </div>
      </div>
      <div id="fullscreen-map-container" style="width:100%; height:100%;"></div>
      <!-- Nearby places legend -->
      <div style="position:absolute; bottom:24px; left:24px; z-index:10001; background:rgba(10,14,26,0.9); border:1px solid var(--glass-border); border-radius:12px; padding:12px 16px; backdrop-filter:blur(20px); max-width:280px;">
        <div style="font-size:11px; font-weight:700; color:var(--accent-gold); text-transform:uppercase; margin-bottom:8px;">Map Legend</div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:14px; height:14px; border-radius:50%; background:linear-gradient(135deg, #FF6B35, #F7C948); border:2px solid white;"></div>
            <span style="font-size:12px; color:var(--text-secondary);">${place.name}</span>
          </div>
          ${nearbyPlaces.length > 0 ? `
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="width:14px; height:14px; border-radius:50%; background:var(--accent-teal); border:2px solid white; opacity:0.8;"></div>
              <span style="font-size:12px; color:var(--text-secondary);">${nearbyPlaces.length} Nearby Attractions</span>
            </div>
          ` : ''}
        </div>
      </div>
    </div>

    <main class="page">
      <!-- Place Hero Banner -->
      <section class="place-hero animate-on-scroll" style="background-image: linear-gradient(180deg, rgba(10, 14, 26, 0.1) 0%, rgba(10, 14, 26, 0.95) 100%), url('${place.image}')">
        <div class="place-hero-overlay container">
          <div class="flex-center gap-2 mb-3" style="justify-content: flex-start;">
            <a href="#/state/${place.stateId}" class="badge" style="background: var(--accent-saffron); color: var(--text-inverse); font-weight: 700; text-transform: uppercase; text-decoration: none;">
              ${state?.name || place.stateId}
            </a>
            <span class="badge" style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--glass-border); color: var(--text-primary); text-transform: capitalize;">
              ${cat?.name || place.category}
            </span>
          </div>
          <h1 class="place-hero-title font-heading">${place.name}</h1>
          <p class="place-hero-location flex-center gap-2" style="justify-content: flex-start;">
            <i data-lucide="map-pin" style="width: 18px; height: 18px; color: var(--accent-gold);"></i> ${place.district} District
          </p>
        </div>
      </section>

      <!-- Info Cards Grid -->
      <section class="container mt-4 animate-on-scroll">
        <div class="info-grid">
          <!-- Rating -->
          <div class="info-card">
            <div class="info-card-icon flex-center" style="width: 40px; height: 40px; border-radius: var(--radius-full); background: rgba(247, 201, 72, 0.1); margin: 0 auto var(--space-xs);">
              <i data-lucide="star" style="color: var(--accent-gold); width: 20px; height: 20px;"></i>
            </div>
            <div class="info-card-value font-heading">${place.rating}</div>
            <div class="info-card-label">${stars}</div>
          </div>

          <!-- Best Time -->
          <div class="info-card">
            <div class="info-card-icon flex-center" style="width: 40px; height: 40px; border-radius: var(--radius-full); background: rgba(0, 217, 163, 0.1); margin: 0 auto var(--space-xs);">
              <i data-lucide="calendar" style="color: var(--accent-teal); width: 20px; height: 20px;"></i>
            </div>
            <div class="info-card-value" style="font-size: var(--font-size-md); font-weight: 700;">Best Season</div>
            <div class="info-card-label" style="color: var(--text-primary); font-weight: 600; margin-top: 4px;">${place.bestTime}</div>
          </div>

          <!-- Entry Fee -->
          <div class="info-card">
            <div class="info-card-icon flex-center" style="width: 40px; height: 40px; border-radius: var(--radius-full); background: rgba(255, 107, 99, 0.1); margin: 0 auto var(--space-xs);">
              <i data-lucide="ticket" style="color: var(--accent-coral); width: 20px; height: 20px;"></i>
            </div>
            <div class="info-card-value" style="font-size: var(--font-size-md); font-weight: 700;">Entry Fee</div>
            <div class="info-card-label" style="color: var(--text-primary); font-weight: 600; margin-top: 4px;">${place.entryFee}</div>
          </div>

          <!-- Timings -->
          <div class="info-card">
            <div class="info-card-icon flex-center" style="width: 40px; height: 40px; border-radius: var(--radius-full); background: rgba(56, 189, 248, 0.1); margin: 0 auto var(--space-xs);">
              <i data-lucide="clock" style="color: var(--accent-blue); width: 20px; height: 20px;"></i>
            </div>
            <div class="info-card-value" style="font-size: var(--font-size-md); font-weight: 700;">Timings</div>
            <div class="info-card-label" style="color: var(--text-primary); font-weight: 600; margin-top: 4px;">${place.timings}</div>
          </div>
        </div>
      </section>

      <!-- Main Layout: Description & Activities / Sidebar Map -->
      <section class="section-padding container grid-3 animate-on-scroll" style="gap: var(--space-xl); align-items: start;">
        <div style="grid-column: span 2;">
          <h2 class="font-heading text-gradient mb-3" style="font-size: var(--font-size-xl);">Overview</h2>
          <p style="color: var(--text-secondary); line-height: 1.8; font-size: var(--font-size-md);">${place.description}</p>
          
          <!-- Things to Do -->
          <h2 class="font-heading text-gradient mt-5 mb-3" style="font-size: var(--font-size-xl);">Things to Do</h2>
          <div class="grid-2" style="gap: var(--space-md);">
            ${(place.thingsToDo || []).map(thing => `
              <div class="flex-center p-3" style="justify-content: flex-start; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); gap: var(--space-md);">
                <div class="flex-center" style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: rgba(0, 217, 163, 0.08); color: var(--accent-teal); flex-shrink:0;">
                  <i data-lucide="check" style="width: 20px; height: 20px;"></i>
                </div>
                <span style="font-size: var(--font-size-sm); color: var(--text-secondary); font-weight: 600;">${thing}</span>
              </div>
            `).join('')}
          </div>

          <!-- Travel Tips -->
          <h2 class="font-heading text-gradient mt-5 mb-3" style="font-size: var(--font-size-xl);">Travel Tips</h2>
          <ul style="list-style: none; padding: 0;">
            ${(place.travelTips || []).map(tip => `
              <li class="flex-center gap-3 p-3 mb-2" style="align-items: start; background: var(--bg-card); border-left: 3px solid var(--accent-gold); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: var(--font-size-sm); color: var(--text-secondary); line-height: 1.5;">
                <i data-lucide="lightbulb" style="color: var(--accent-gold); width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px;"></i>
                <span>${tip}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Sidebar Actions & Map -->
        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
          <!-- Route Control -->
          <div class="filter-panel" style="padding: var(--space-xl); border-radius: var(--radius-xl); border: 1px solid var(--glass-border); background: var(--bg-card); backdrop-filter: blur(20px);">
            <h3 class="mb-3 font-heading" style="font-size: var(--font-size-md); font-weight: 700;">Plan Your Route</h3>
            <p style="color: var(--text-muted); font-size: var(--font-size-xs); line-height: 1.4; margin-bottom: var(--space-lg);">Add this destination to your custom itinerary board, then head to the Route Planner to optimize your trip.</p>
            <button id="add-to-route-btn" class="btn btn-primary w-full flex-center gap-2 mb-2" style="border-radius: var(--radius-lg);">
              <i data-lucide="plus-circle" style="width: 18px; height: 18px;"></i> Add to Route
            </button>
            <button id="btn-wishlist-place" class="btn ${YatraAuth.isPlaceWishlisted(place.id) ? 'btn-primary' : 'btn-secondary'} w-full flex-center gap-2 mb-2" style="border-radius: var(--radius-lg);">
              <i data-lucide="heart" style="width: 18px; height: 18px; ${YatraAuth.isPlaceWishlisted(place.id) ? 'fill: currentColor;' : ''}"></i> 
              ${YatraAuth.isPlaceWishlisted(place.id) ? 'Wishlisted ♥' : 'Add to Wishlist'}
            </button>
            <a href="#/state/${place.stateId}" class="btn btn-secondary w-full flex-center gap-2" style="border-radius: var(--radius-lg);">
              <i data-lucide="arrow-left" style="width: 18px; height: 18px;"></i> Back to State
            </a>
          </div>

          <!-- Location Map Card -->
          <div style="border: 1px solid var(--glass-border); border-radius: var(--radius-xl); overflow: hidden; background: var(--bg-card);">
            <div style="background: rgba(255,255,255,0.03); padding: var(--space-md) var(--space-lg); border-bottom: 1px solid var(--glass-border); font-size: var(--font-size-xs); font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; gap:6px;">
                <i data-lucide="map" style="width:14px;height:14px; color:var(--accent-teal);"></i> Interactive Map
              </span>
              <span style="font-size:10px; color:var(--text-muted); font-weight:400;">Click to explore</span>
            </div>
            <div id="place-map" style="width: 100%; height: 280px; background: var(--bg-primary); cursor: pointer;"></div>
            <div style="padding:12px 16px; display:flex; gap:8px; flex-wrap:wrap; border-top:1px solid var(--glass-border);">
              <button id="btn-open-fullmap" style="flex:1; display:flex; align-items:center; justify-content:center; gap:6px; padding:10px 16px; background:linear-gradient(135deg, rgba(255,107,53,0.12), rgba(247,201,72,0.12)); border:1px solid rgba(255,107,53,0.25); border-radius:10px; color:var(--accent-saffron); font-size:12px; font-weight:700; cursor:pointer; transition:all 0.3s;"
                      onmouseover="this.style.background='linear-gradient(135deg, rgba(255,107,53,0.25), rgba(247,201,72,0.25))'" 
                      onmouseout="this.style.background='linear-gradient(135deg, rgba(255,107,53,0.12), rgba(247,201,72,0.12))'">
                <i data-lucide="maximize-2" style="width:14px;height:14px;"></i> Full Map
              </button>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}" target="_blank" rel="noopener"
                 style="flex:1; display:flex; align-items:center; justify-content:center; gap:6px; padding:10px 16px; background:rgba(66,133,244,0.12); border:1px solid rgba(66,133,244,0.25); border-radius:10px; color:#4285F4; font-size:12px; font-weight:700; text-decoration:none; cursor:pointer; transition:all 0.3s;"
                 onmouseover="this.style.background='rgba(66,133,244,0.25)'" 
                 onmouseout="this.style.background='rgba(66,133,244,0.12)'">
                <i data-lucide="navigation" style="width:14px;height:14px;"></i> Directions
              </a>
            </div>
          </div>

          <!-- Coordinates Card -->
          <div style="border: 1px solid var(--glass-border); border-radius: var(--radius-xl); overflow: hidden; background: var(--bg-card); padding:16px;">
            <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
              <i data-lucide="crosshair" style="width:14px;height:14px; color:var(--accent-blue);"></i> GPS Coordinates
            </div>
            <div style="display:flex; gap:12px;">
              <div style="flex:1; background:var(--bg-primary); border-radius:8px; padding:8px 12px; border:1px solid var(--glass-border);">
                <div style="font-size:10px; color:var(--text-muted); margin-bottom:2px;">Latitude</div>
                <div style="font-size:14px; font-weight:700; color:var(--accent-teal); font-family:var(--font-heading);">${place.lat.toFixed(4)}°</div>
              </div>
              <div style="flex:1; background:var(--bg-primary); border-radius:8px; padding:8px 12px; border:1px solid var(--glass-border);">
                <div style="font-size:10px; color:var(--text-muted); margin-bottom:2px;">Longitude</div>
                <div style="font-size:14px; font-weight:700; color:var(--accent-saffron); font-family:var(--font-heading);">${place.lng.toFixed(4)}°</div>
              </div>
            </div>
          </div>

          <!-- AdSense Sidebar Block -->
          <div class="ad-slot" style="margin-top: 0; padding: var(--space-md); border-radius: var(--radius-xl);">
            <div class="ad-slot-label" style="margin-bottom: 6px;">Advertisement</div>
            <div style="min-height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); font-size: 11px; text-align: center;">
              <i data-lucide="layout" style="width: 20px; height: 20px; margin-bottom: 6px; color: rgba(255,255,255,0.15);"></i>
              <span>Responsive Vertical Unit<br>(Google AdSense Sidebar)</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Nearby Attractions -->
      ${nearbyPlaces.length > 0 ? `
        <section class="section-padding" style="background: var(--bg-secondary); border-top: 1px solid var(--glass-border);">
          <div class="container animate-on-scroll">
            <h2 class="font-heading text-gradient mb-4" style="font-size: var(--font-size-xl);">Nearby Attractions</h2>
            <div class="nearby-carousel" style="display: flex; gap: var(--space-lg); overflow-x: auto; padding: var(--space-md) var(--space-xs); scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
              ${nearbyPlaces.map(p => `
                <div class="place-card" onclick="window.location.hash='#/place/${p.id}'" style="flex: 0 0 280px; scroll-snap-align: start; cursor: pointer;">
                  <div class="place-card-image">
                    <img src="${p.image}" alt="${p.name}">
                  </div>
                  <div class="place-card-body">
                    <h3 class="place-card-title">${p.name}</h3>
                    <div class="place-card-location flex-center gap-1" style="justify-content: flex-start;">
                      <i data-lucide="map-pin" style="width: 12px; height: 12px; color: var(--text-muted);"></i>
                      <span>${p.district}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      ` : ''}

    </main>

    ${renderFooter()}
  `;

  // Bind "Add to Route" button
  const routeBtn = outlet.querySelector('#add-to-route-btn');
  if (routeBtn) {
    routeBtn.addEventListener('click', () => {
      let routePlaces = [];
      try {
        const stored = sessionStorage.getItem('routePlaces');
        if (stored) {
          routePlaces = JSON.parse(stored);
        }
      } catch (e) {
        console.error('Error parsing routePlaces', e);
      }

      if (!routePlaces.includes(place.id)) {
        routePlaces.push(place.id);
        sessionStorage.setItem('routePlaces', JSON.stringify(routePlaces));
        
        // Show success and animate button
        routeBtn.classList.remove('btn-primary');
        routeBtn.classList.add('btn-success');
        routeBtn.innerHTML = `<i data-lucide="check" style="width: 18px; height: 18px;"></i> Added!`;
        if (window.lucide) window.lucide.createIcons();
        
        setTimeout(() => {
          window.location.hash = `#/route-planner?state=${place.stateId}`;
        }, 800);
      } else {
        window.location.hash = `#/route-planner?state=${place.stateId}`;
      }
    });
  }

  // Bind wishlist button
  const wishlistBtn = outlet.querySelector('#btn-wishlist-place');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      if (!YatraAuth.isLoggedIn()) {
        window.location.hash = '#/auth?mode=login';
        return;
      }
      const added = YatraAuth.toggleWishlistPlace(place.id);
      if (added) {
        wishlistBtn.classList.remove('btn-secondary');
        wishlistBtn.classList.add('btn-primary');
        wishlistBtn.innerHTML = `<i data-lucide="heart" style="width: 18px; height: 18px; fill: currentColor;"></i> Wishlisted ♥`;
      } else {
        wishlistBtn.classList.remove('btn-primary');
        wishlistBtn.classList.add('btn-secondary');
        wishlistBtn.innerHTML = `<i data-lucide="heart" style="width: 18px; height: 18px;"></i> Add to Wishlist`;
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // Initialize sidebar map
  initSidebarMap();

  // Bind fullscreen map button
  const fullMapBtn = outlet.querySelector('#btn-open-fullmap');
  if (fullMapBtn) {
    fullMapBtn.addEventListener('click', openFullscreenMap);
  }

  // Also open fullscreen map when clicking on sidebar map
  const sidebarMapDiv = outlet.querySelector('#place-map');
  if (sidebarMapDiv) {
    sidebarMapDiv.addEventListener('click', openFullscreenMap);
  }

  // Bind close fullscreen
  const closeBtn = outlet.querySelector('#close-fullscreen-map');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeFullscreenMap);
  }

  // ESC key to close
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeFullscreenMap();
      document.removeEventListener('keydown', escHandler);
    }
  });

  let sidebarMap = null;
  let fullscreenMap = null;

  function initSidebarMap() {
    const mapDiv = document.getElementById('place-map');
    if (!mapDiv || typeof L === 'undefined') return;

    sidebarMap = L.map('place-map', {
      center: [place.lat, place.lng],
      zoom: 11,
      zoomControl: false, // hide zoom controls for small map
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(sidebarMap);

    // Add main place marker
    const mainIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background:linear-gradient(135deg,#FF6B35,#F7C948); width:32px; height:32px; border-radius:50%; border:3px solid white; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(255,107,53,0.4);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
    
    L.marker([place.lat, place.lng], { icon: mainIcon }).addTo(sidebarMap)
      .bindPopup(`<strong>${place.name}</strong><br>${place.district} District`).openPopup();

    // Nearby place markers (smaller, teal colored)
    nearbyPlaces.forEach(np => {
      const nearIcon = L.divIcon({
        className: 'custom-marker-small',
        html: `<div style="background:var(--accent-teal,#00D9A3); width:22px; height:22px; border-radius:50%; border:2px solid white; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,217,163,0.3); opacity:0.85;"><svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="none"><circle cx="12" cy="12" r="6"/></svg></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 22]
      });
      L.marker([np.lat, np.lng], { icon: nearIcon }).addTo(sidebarMap)
        .bindPopup(`<div style="font-family:sans-serif;"><strong style="color:#FF6B35;">${np.name}</strong><br><span style="font-size:11px;color:#777;">${np.district}</span><br><a href="#/place/${np.id}" style="font-size:11px; color:#4285F4;">View Details →</a></div>`);
    });
  }

  function openFullscreenMap() {
    const modal = document.getElementById('fullscreen-map-modal');
    if (!modal) return;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Slight delay for DOM render
    setTimeout(() => {
      if (fullscreenMap) {
        fullscreenMap.remove();
      }

      fullscreenMap = L.map('fullscreen-map-container', {
        center: [place.lat, place.lng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(fullscreenMap);

      // Main marker with animated pulse effect
      const mainIcon = L.divIcon({
        className: 'fullscreen-main-marker',
        html: `
          <div style="position:relative;">
            <div style="position:absolute; top:-12px; left:-12px; width:48px; height:48px; border-radius:50%; background:rgba(255,107,53,0.2); animation:pulse-ring 2s infinite;"></div>
            <div style="position:relative; background:linear-gradient(135deg,#FF6B35,#F7C948); width:40px; height:40px; border-radius:50%; border:3px solid white; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 20px rgba(255,107,53,0.5); z-index:1;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      L.marker([place.lat, place.lng], { icon: mainIcon }).addTo(fullscreenMap)
        .bindPopup(`
          <div style="font-family:sans-serif; padding:4px; min-width:200px;">
            <h4 style="margin:0 0 4px; color:#FF6B35; font-size:14px;">${place.name}</h4>
            <p style="margin:0 0 4px; font-size:11px; color:#777;">${place.district} District, ${state?.name || ''}</p>
            <p style="margin:0 0 8px; font-size:11px; color:#555; line-height:1.3;">${place.description.substring(0, 100)}...</p>
            <div style="display:flex; gap:8px;">
              <span style="font-size:10px; background:#FFF3E0; color:#FF6B35; padding:2px 6px; border-radius:4px; font-weight:600;">⭐ ${place.rating}</span>
              <span style="font-size:10px; background:#E8F5E9; color:#2E7D32; padding:2px 6px; border-radius:4px; font-weight:600;">${place.entryFee}</span>
            </div>
          </div>
        `).openPopup();

      // Nearby markers
      nearbyPlaces.forEach(np => {
        const nearIcon = L.divIcon({
          className: 'fullscreen-nearby-marker',
          html: `<div style="background:#00D9A3; width:28px; height:28px; border-radius:50%; border:2px solid white; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,217,163,0.4); cursor:pointer;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 28],
          popupAnchor: [0, -28]
        });
        
        L.marker([np.lat, np.lng], { icon: nearIcon }).addTo(fullscreenMap)
          .bindPopup(`
            <div style="font-family:sans-serif; padding:4px; min-width:180px;">
              <h4 style="margin:0 0 4px; color:#00D9A3; font-size:13px;">${np.name}</h4>
              <p style="margin:0 0 8px; font-size:11px; color:#777;">${np.district} District</p>
              <a href="#/place/${np.id}" style="display:block; text-align:center; background:linear-gradient(135deg,#FF6B35,#F7C948); color:white; border-radius:4px; padding:4px 12px; text-decoration:none; font-size:11px; font-weight:700;">View Details</a>
            </div>
          `);
      });

      // Add CSS animation for pulse
      if (!document.getElementById('map-pulse-style')) {
        const style = document.createElement('style');
        style.id = 'map-pulse-style';
        style.textContent = `
          @keyframes pulse-ring { 
            0% { transform: scale(0.8); opacity: 0.6; } 
            50% { transform: scale(1.3); opacity: 0; } 
            100% { transform: scale(0.8); opacity: 0.6; } 
          }
          @keyframes pulse { 
            0%, 100% { opacity: 1; } 
            50% { opacity: 0.7; } 
          }
        `;
        document.head.appendChild(style);
      }

      fullscreenMap.invalidateSize();

      if (window.lucide) window.lucide.createIcons();
    }, 100);
  }

  function closeFullscreenMap() {
    const modal = document.getElementById('fullscreen-map-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    if (fullscreenMap) {
      fullscreenMap.remove();
      fullscreenMap = null;
    }
  }

  // Re-create Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
window.renderPlacePage = renderPlacePage;
