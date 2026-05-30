async function renderMapPage(outlet, params, query, { renderNavbar, renderFooter }) {
  let activeCategory = 'all';
  let activeRegion = 'all';
  let mapInstance = null;
  let markerGroup = null;

  outlet.innerHTML = `
    ${renderNavbar()}
    
    <main class="page relative" style="height: calc(100vh - 80px); min-height: 500px; padding: 0; overflow: hidden;">
      <!-- Map Container -->
      <div id="full-map" style="width: 100%; height: 100%; background: var(--bg-primary);"></div>

      <!-- Elegant Glass Filter Overlay -->
      <div class="filter-overlay" style="position: absolute; top: var(--space-md); left: var(--space-md); z-index: 1000; background: rgba(10, 14, 26, 0.85); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); padding: var(--space-lg); max-width: 320px; width: calc(100% - 2 * var(--space-md)); backdrop-filter: blur(20px); box-shadow: var(--glass-shadow);">
        <h3 class="mb-3 font-heading flex-center gap-2" style="justify-content: flex-start; font-size: var(--font-size-md); font-weight: 700; color: var(--accent-saffron);">
          <i data-lucide="map-pin" style="width: 18px; height: 18px;"></i> Interactive Map
        </h3>
        <p style="font-size: var(--font-size-xs); color: var(--text-muted); line-height: 1.4; margin-bottom: var(--space-md);">
          Explore tourist places across India. Use filters below to search by travel style or region.
        </p>

        <!-- Category Dropdown -->
        <div class="mb-3">
          <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: var(--space-xs);">Travel Category</label>
          <select id="map-category-select" style="background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); width: 100%; cursor: pointer;">
            <option value="all">All Categories</option>
            ${CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>

        <!-- Region Dropdown -->
        <div class="mb-3">
          <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: var(--space-xs);">Region</label>
          <select id="map-region-select" style="background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); width: 100%; cursor: pointer;">
            <option value="all">All Regions</option>
            <option value="north">North India</option>
            <option value="south">South India</option>
            <option value="east">East India</option>
            <option value="west">West India</option>
            <option value="central">Central India</option>
            <option value="northeast">Northeast India</option>
            <option value="islands">Islands</option>
          </select>
        </div>

        <!-- Dynamic Marker Count -->
        <div id="map-marker-count" style="font-size: 11px; color: var(--text-muted); font-weight: 600;">
          Showing ${ALL_PLACES.length} places
        </div>
      </div>
    </main>
  `;

  // Bind dropdowns
  const catSelect = outlet.querySelector('#map-category-select');
  const regSelect = outlet.querySelector('#map-region-select');

  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      activeCategory = e.target.value;
      updateMarkers();
    });
  }

  if (regSelect) {
    regSelect.addEventListener('change', (e) => {
      activeRegion = e.target.value;
      updateMarkers();
    });
  }

  // Initialize Map
  initMap();

  function initMap() {
    const mapDiv = document.getElementById('full-map');
    if (!mapDiv) return;

    if (typeof L === 'undefined') {
      console.error('Leaflet is not loaded.');
      return;
    }

    // Centered on India
    mapInstance = L.map('full-map', {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: false // we will place zoom control on top right
    });

    // Add zoom control at top right
    L.control.zoom({
      position: 'topright'
    }).addTo(mapInstance);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);

    markerGroup = L.featureGroup().addTo(mapInstance);

    // Initial marker render
    updateMarkers();
  }

  function updateMarkers() {
    if (!mapInstance || !markerGroup) return;

    // Clear existing markers
    markerGroup.clearLayers();

    // Filter places
    const filtered = ALL_PLACES.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory || (p.subcategories && p.subcategories.includes(activeCategory));
      
      const state = STATES.find(s => s.id === p.stateId);
      const matchesRegion = activeRegion === 'all' || (state && state.region.toLowerCase() === activeRegion);

      return matchesCategory && matchesRegion;
    });

    // Draw markers
    const markers = [];
    filtered.forEach(p => {
      const marker = L.marker([p.lat, p.lng]);
      
      const popupContent = `
        <div style="font-family: var(--font-body); color: #0A0E1A; padding: var(--space-xs); max-width: 220px;">
          <h4 style="font-family: var(--font-heading); margin-bottom: var(--space-xs); font-weight: 700; color: #FF6B35; font-size: 13px;">${p.name}</h4>
          <span style="font-size: 10px; color: #777; background: #eee; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: var(--space-sm); font-weight: 600;">
            ${STATES.find(s => s.id === p.stateId)?.name || p.stateId}
          </span>
          <p style="font-size: 11px; margin-bottom: var(--space-sm); line-height:1.4; color: #555;">${p.description.substring(0, 80)}...</p>
          <a href="#/place/${p.id}" style="display: block; text-align: center; background: linear-gradient(135deg, #FF6B35, #F7C948); color: white; border-radius: var(--radius-sm); padding: 4px var(--space-md); text-decoration: none; font-size: 11px; font-weight: 700;">View Details</a>
        </div>
      `;
      marker.bindPopup(popupContent);
      marker.addTo(markerGroup);
      markers.push(marker);
    });

    // Fit map bounds to show filtered markers if we have markers
    if (markers.length > 0) {
      const group = new L.featureGroup(markers);
      mapInstance.fitBounds(group.getBounds().pad(0.1));
    }

    // Update count
    const countDiv = document.getElementById('map-marker-count');
    if (countDiv) {
      countDiv.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${ALL_PLACES.length}</strong> places`;
    }
  }

  // Re-create Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
window.renderMapPage = renderMapPage;
