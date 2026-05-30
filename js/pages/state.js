async function renderStatePage(outlet, params, query, { renderNavbar, renderFooter }) {
  const stateId = params.id;
  const state = STATES.find(s => s.id === stateId);

  if (!state) {
    outlet.innerHTML = `
      ${renderNavbar()}
      <main class="page flex-center section-padding" style="min-height:70vh;">
        <div class="text-center">
          <h2 class="text-gradient mb-3">State Not Found</h2>
          <p class="mb-4">We haven't mapped this state yet. Let's find another destination!</p>
          <a href="#/explore" class="btn btn-primary">Back to Explore</a>
        </div>
      </main>
      ${renderFooter()}
    `;
    return;
  }

  // Get places in this state
  const places = getPlacesByState(stateId);

  // Extract unique categories available in this state's places
  const availableCatIds = [...new Set(places.map(p => p.category))];
  const stateCategories = CATEGORIES.filter(c => availableCatIds.includes(c.id));
  
  let activeCategory = 'all';

  outlet.innerHTML = `
    ${renderNavbar()}
    
    <main class="page">
      <!-- State Hero Banner -->
      <section class="place-hero" style="background-image: linear-gradient(180deg, rgba(10, 14, 26, 0.1) 0%, rgba(10, 14, 26, 0.95) 100%), url('${state.image}')">
        <div class="place-hero-overlay container animate-on-scroll">
          <div class="flex-center gap-2 mb-3" style="justify-content: flex-start;">
            <span class="badge" style="background: var(--accent-saffron); color: var(--text-inverse); font-weight: 700; text-transform: uppercase;">${state.type}</span>
            <span class="badge" style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--glass-border); color: var(--text-primary); text-transform: capitalize;">${state.region} India</span>
          </div>
          <h1 class="place-hero-title font-heading">${state.name}</h1>
          <p class="place-hero-location flex-center gap-2" style="justify-content: flex-start;">
            <i data-lucide="building" style="width: 18px; height: 18px; color: var(--accent-gold);"></i> Capital: ${state.capital}
            <span style="color: var(--text-muted)">|</span>
            <i data-lucide="calendar" style="width: 18px; height: 18px; color: var(--accent-teal);"></i> Best Time: ${state.bestTime}
          </p>
        </div>
      </section>

      <!-- Description & Quick Stats -->
      <section class="section-padding container grid-3 animate-on-scroll" style="gap: var(--space-xl); align-items: start;">
        <div style="grid-column: span 2;">
          <h2 class="font-heading text-gradient mb-3" style="font-size: var(--font-size-xl);">Welcome to ${state.name}</h2>
          <p style="color: var(--text-secondary); line-height: 1.7; font-size: var(--font-size-md);">${state.description}</p>
          
          <div class="mt-4 flex-center gap-3" style="justify-content: flex-start;">
            <a href="#/route-planner?state=${state.id}" class="btn btn-primary flex-center gap-2" style="border-radius: var(--radius-full);">
              <i data-lucide="navigation" style="width: 18px; height: 18px;"></i> Smart Route Planner
            </a>
            <button id="btn-wishlist-state" class="btn ${YatraAuth.isStateWishlisted(state.id) ? 'btn-primary' : 'btn-secondary'} flex-center gap-2" style="border-radius: var(--radius-full);">
              <i data-lucide="heart" style="width: 18px; height: 18px; ${YatraAuth.isStateWishlisted(state.id) ? 'fill: currentColor;' : ''}"></i> 
              ${YatraAuth.isStateWishlisted(state.id) ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>
        </div>

        <!-- Highlights Card -->
        <div class="filter-panel" style="padding: var(--space-xl); border-radius: var(--radius-xl); border: 1px solid var(--glass-border); background: var(--bg-card); backdrop-filter: blur(20px);">
          <h3 class="mb-3 flex-center gap-2" style="justify-content: flex-start; font-size: var(--font-size-md); font-weight: 700; color: var(--accent-gold);">
            <i data-lucide="sparkles" style="width: 18px; height: 18px;"></i> Travel Highlights
          </h3>
          <ul style="list-style: none; padding: 0;">
            ${(state.highlights || []).map(hl => `
              <li class="flex-center gap-2" style="align-items: start; margin-bottom: var(--space-md); font-size: var(--font-size-sm); color: var(--text-secondary); line-height: 1.4;">
                <i data-lucide="check" style="width: 16px; height: 16px; color: var(--accent-teal); flex-shrink: 0; margin-top: 2px;"></i>
                <span>${hl}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </section>

      <!-- Interactive Map & Places Grid -->
      <section class="section-padding" style="background: var(--bg-secondary); border-top: 1px solid var(--glass-border);">
        <div class="container animate-on-scroll">
          <div class="text-center mb-5">
            <h2 class="font-heading text-gradient" style="font-size: var(--font-size-2xl);">Famous Places in ${state.name}</h2>
            <p style="color: var(--text-secondary);">${places.length} curated destinations to explore</p>
          </div>

          <!-- Leaflet Interactive Map -->
          <div class="mb-5" style="border: 1px solid var(--glass-border); border-radius: var(--radius-2xl); overflow: hidden; box-shadow: var(--glass-shadow);">
            <div id="state-map" style="width: 100%; height: 350px; background: var(--bg-primary);"></div>
          </div>

          <!-- Category Filter Tabs -->
          <div class="flex-center gap-2 mb-4 flex-wrap" style="justify-content: flex-start;">
            <button class="btn btn-primary" id="cat-tab-all" data-category="all" style="border-radius: var(--radius-full); padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); font-weight: 600;">
              All Places
            </button>
            ${stateCategories.map(cat => `
              <button class="btn btn-secondary" id="cat-tab-${cat.id}" data-category="${cat.id}" style="border-radius: var(--radius-full); padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); font-weight: 600;">
                ${cat.name}
              </button>
            `).join('')}
          </div>

          <!-- Places Grid -->
          <div id="state-places-grid" class="grid-3">
            <!-- Dynamic place cards here -->
          </div>
        </div>
      </section>
    </main>

    ${renderFooter()}
  `;

  // Bind category filter tabs
  const tabAll = outlet.querySelector('#cat-tab-all');
  const tabs = outlet.querySelectorAll('.flex-center[style*="justify-content: flex-start;"] button');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('btn-primary');
        t.classList.add('btn-secondary');
      });
      tab.classList.remove('btn-secondary');
      tab.classList.add('btn-primary');
      
      activeCategory = tab.getAttribute('data-category');
      renderPlaces();
    });
  });

  // Render places
  renderPlaces();

  // Initialize Map
  initMap();

  function renderPlaces() {
    const grid = outlet.querySelector('#state-places-grid');
    if (!grid) return;

    const filtered = activeCategory === 'all'
      ? places
      : places.filter(p => p.category === activeCategory);

    if (filtered.length === 0) {
      grid.className = 'flex-center section-padding';
      grid.innerHTML = `
        <div class="text-center">
          <i data-lucide="map-pin-off" style="width: 48px; height: 48px; color: var(--text-muted); margin: 0 auto var(--space-md);"></i>
          <h3>No Places Available</h3>
          <p style="color: var(--text-muted);">We are currently expanding our list for this category.</p>
        </div>
      `;
    } else {
      grid.className = 'grid-3';
      grid.innerHTML = filtered.map(p => {
        const cat = CATEGORIES.find(c => c.id === p.category);
        const stars = Array(5).fill(0).map((_, i) => 
          `<i data-lucide="star" style="width: 14px; height: 14px; fill: ${i < Math.floor(p.rating) ? 'var(--accent-gold)' : 'none'}; color: var(--accent-gold);"></i>`
        ).join('');

        return `
          <div class="place-card" onclick="window.location.hash='#/place/${p.id}'" style="cursor: pointer;">
            <div class="place-card-image relative">
              <img src="${p.image}" alt="${p.name}">
              <span class="badge" style="background: rgba(10, 14, 26, 0.7); border: 1px solid var(--glass-border); color: ${cat?.color || 'var(--accent-saffron)'}; font-weight: 700;">
                ${cat?.name || p.category}
              </span>
            </div>
            <div class="place-card-body">
              <h3 class="place-card-title">${p.name}</h3>
              <div class="place-card-location flex-center gap-1" style="justify-content: flex-start;">
                <i data-lucide="map-pin" style="width: 12px; height: 12px; color: var(--text-muted);"></i>
                <span>${p.district} District</span>
              </div>
              <p style="color: var(--text-secondary); font-size: var(--font-size-xs); line-height: 1.4; margin-bottom: var(--space-sm);" class="line-clamp-2">${p.description}</p>
            </div>
            <div class="place-card-footer flex-between" style="border-top: 1px solid var(--glass-border);">
              <div class="place-card-rating flex-center gap-1">
                ${stars}
                <span style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-primary); margin-left: var(--space-xs);">${p.rating}</span>
              </div>
              <span class="place-card-meta flex-center gap-1" style="font-size: 11px;">
                <i data-lucide="calendar" style="width: 12px; height: 12px; color: var(--accent-teal);"></i> ${p.bestTime.split(',')[0]}
              </span>
            </div>
          </div>
        `;
      }).join('');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function initMap() {
    const mapDiv = document.getElementById('state-map');
    if (!mapDiv || places.length === 0) return;

    // Check if Leaflet L is loaded globally
    if (typeof L === 'undefined') {
      console.error('Leaflet is not loaded globally.');
      return;
    }

    // Calculate center
    const lats = places.map(p => p.lat);
    const lngs = places.map(p => p.lng);
    const centerLat = lats.reduce((sum, l) => sum + l, 0) / places.length;
    const centerLng = lngs.reduce((sum, l) => sum + l, 0) / places.length;

    // Create map
    const map = L.map('state-map', {
      center: [centerLat, centerLng],
      zoom: places.length > 5 ? 7 : 8,
      zoomControl: true,
      scrollWheelZoom: false
    });

    // Add Tile Layer (Sleek dark theme tiles or OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create markers
    const markers = [];
    places.forEach(p => {
      const cat = CATEGORIES.find(c => c.id === p.category);
      const marker = L.marker([p.lat, p.lng]).addTo(map);
      
      // Beautiful dark-themed custom popup
      const popupContent = `
        <div style="font-family: var(--font-body); color: #0A0E1A; padding: var(--space-xs); max-width: 220px;">
          <h4 style="font-family: var(--font-heading); margin-bottom: var(--space-xs); font-weight: 700; color: #FF6B35; font-size: 14px;">${p.name}</h4>
          <p style="font-size: 11px; margin-bottom: var(--space-sm); line-height:1.4; color: #555;">${p.description.substring(0, 80)}...</p>
          <a href="#/place/${p.id}" style="display: block; text-align: center; background: linear-gradient(135deg, #FF6B35, #F7C948); color: white; border-radius: var(--radius-sm); padding: 4px var(--space-md); text-decoration: none; font-size: 11px; font-weight: 700;">View Details</a>
        </div>
      `;
      marker.bindPopup(popupContent);
      markers.push(marker);
    });

    // Fit map to show all markers nicely
    if (places.length > 1) {
      const group = new L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.15));
    }
  }

  // Re-create Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Bind state wishlist button
  const wishlistStateBtn = outlet.querySelector('#btn-wishlist-state');
  if (wishlistStateBtn) {
    wishlistStateBtn.addEventListener('click', () => {
      if (!YatraAuth.isLoggedIn()) {
        window.location.hash = '#/auth?mode=login';
        return;
      }
      const added = YatraAuth.toggleWishlistState(state.id);
      if (added) {
        wishlistStateBtn.classList.remove('btn-secondary');
        wishlistStateBtn.classList.add('btn-primary');
        wishlistStateBtn.innerHTML = `<i data-lucide="heart" style="width: 18px; height: 18px; fill: currentColor;"></i> Wishlisted`;
      } else {
        wishlistStateBtn.classList.remove('btn-primary');
        wishlistStateBtn.classList.add('btn-secondary');
        wishlistStateBtn.innerHTML = `<i data-lucide="heart" style="width: 18px; height: 18px;"></i> Wishlist`;
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }
}
window.renderStatePage = renderStatePage;
