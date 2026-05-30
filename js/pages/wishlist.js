// ============================================================
//  Yatra — Wishlist / Profile Page
// ============================================================

async function renderWishlistPage(outlet, params, query, { renderNavbar, renderFooter }) {
  const user = YatraAuth.getCurrentUser();

  if (!user) {
    window.location.hash = '#/auth?mode=login';
    return;
  }

  const wishlist = user.wishlist || { places: [], states: [], routes: [] };
  const activeTab = query.tab || 'places';

  // Resolve wishlist items
  const wishlistedPlaces = (wishlist.places || []).map(id => getPlaceById(id)).filter(Boolean);
  const wishlistedStates = (wishlist.states || []).map(id => STATES.find(s => s.id === id)).filter(Boolean);
  const savedRoutes = wishlist.routes || [];

  outlet.innerHTML = `
    ${renderNavbar()}
    <main class="page">
      <section class="section-padding container">
        <!-- Profile Header -->
        <div class="animate-on-scroll" style="display: flex; align-items: center; gap: 24px; margin-bottom: 40px; flex-wrap: wrap;">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; color: var(--text-inverse); font-family: var(--font-heading); box-shadow: 0 8px 24px rgba(255,107,53,0.3);">
            ${user.name.charAt(0).toUpperCase()}
          </div>
          <div style="flex: 1; min-width: 200px;">
            <h1 class="font-heading text-gradient" style="font-size: var(--font-size-2xl); margin-bottom: 4px;">${user.name}</h1>
            <p style="color: var(--text-muted); font-size: var(--font-size-sm);">${user.email}</p>
            <p style="color: var(--text-muted); font-size: 11px; margin-top: 4px;">Member since ${new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <button id="btn-logout" class="btn btn-secondary flex-center gap-2" style="border-radius: var(--radius-lg); padding: 10px 20px;">
            <i data-lucide="log-out" style="width: 16px; height: 16px;"></i> Sign Out
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="animate-on-scroll" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 36px;">
          <div style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); padding: 24px; text-align: center;">
            <div style="font-size: 32px; font-weight: 800; color: var(--accent-saffron); font-family: var(--font-heading);">${wishlistedPlaces.length}</div>
            <div style="font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-top: 4px;">Saved Places</div>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); padding: 24px; text-align: center;">
            <div style="font-size: 32px; font-weight: 800; color: var(--accent-teal); font-family: var(--font-heading);">${wishlistedStates.length}</div>
            <div style="font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-top: 4px;">Saved States</div>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); padding: 24px; text-align: center;">
            <div style="font-size: 32px; font-weight: 800; color: var(--accent-gold); font-family: var(--font-heading);">${savedRoutes.length}</div>
            <div style="font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-top: 4px;">Saved Routes</div>
          </div>
        </div>

        <!-- Tab Switcher -->
        <div class="animate-on-scroll" style="display: flex; background: var(--bg-card); border-radius: var(--radius-lg); padding: 4px; margin-bottom: 28px; border: 1px solid var(--glass-border); max-width: 500px;">
          <a href="#/wishlist?tab=places" class="wishlist-tab" style="flex: 1; text-align: center; padding: 10px; border-radius: var(--radius-md); font-size: 12px; font-weight: 700; text-decoration: none; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 6px;
            ${activeTab === 'places' ? 'background: var(--gradient-primary); color: var(--text-inverse);' : 'background: transparent; color: var(--text-muted);'}">
            <i data-lucide="heart" style="width: 14px; height: 14px;"></i> Places
          </a>
          <a href="#/wishlist?tab=states" class="wishlist-tab" style="flex: 1; text-align: center; padding: 10px; border-radius: var(--radius-md); font-size: 12px; font-weight: 700; text-decoration: none; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 6px;
            ${activeTab === 'states' ? 'background: var(--gradient-primary); color: var(--text-inverse);' : 'background: transparent; color: var(--text-muted);'}">
            <i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> States
          </a>
          <a href="#/wishlist?tab=routes" class="wishlist-tab" style="flex: 1; text-align: center; padding: 10px; border-radius: var(--radius-md); font-size: 12px; font-weight: 700; text-decoration: none; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 6px;
            ${activeTab === 'routes' ? 'background: var(--gradient-primary); color: var(--text-inverse);' : 'background: transparent; color: var(--text-muted);'}">
            <i data-lucide="route" style="width: 14px; height: 14px;"></i> Routes
          </a>
        </div>

        <!-- Tab Content -->
        <div class="animate-on-scroll" id="wishlist-content">
          ${activeTab === 'places' ? renderPlacesTab(wishlistedPlaces) : ''}
          ${activeTab === 'states' ? renderStatesTab(wishlistedStates) : ''}
          ${activeTab === 'routes' ? renderRoutesTab(savedRoutes) : ''}
        </div>
      </section>
    </main>
    ${renderFooter()}
  `;

  // Bind logout
  const logoutBtn = outlet.querySelector('#btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      YatraAuth.logout();
      window.location.hash = '#/';
      setTimeout(() => window.dispatchEvent(new HashChangeEvent('hashchange')), 50);
    });
  }

  // Bind remove buttons
  outlet.querySelectorAll('.btn-remove-place').forEach(btn => {
    btn.addEventListener('click', () => {
      YatraAuth.toggleWishlistPlace(btn.dataset.id);
      window.location.hash = '#/wishlist?tab=places';
      setTimeout(() => window.dispatchEvent(new HashChangeEvent('hashchange')), 50);
    });
  });

  outlet.querySelectorAll('.btn-remove-state').forEach(btn => {
    btn.addEventListener('click', () => {
      YatraAuth.toggleWishlistState(btn.dataset.id);
      window.location.hash = '#/wishlist?tab=states';
      setTimeout(() => window.dispatchEvent(new HashChangeEvent('hashchange')), 50);
    });
  });

  outlet.querySelectorAll('.btn-remove-route').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering route card load
      YatraAuth.removeRoute(btn.dataset.id);
      window.location.hash = '#/wishlist?tab=routes';
      setTimeout(() => window.dispatchEvent(new HashChangeEvent('hashchange')), 50);
    });
  });

  // Bind load route click
  outlet.querySelectorAll('.saved-route-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // If clicking the remove button or icon, ignore
      if (e.target.closest('.btn-remove-route')) return;
      
      const routeId = card.dataset.routeId;
      const route = savedRoutes.find(r => r.id === routeId);
      if (route && route.stops) {
        const stopIds = route.stops.map(s => s.id);
        sessionStorage.setItem('routePlaces', JSON.stringify(stopIds));
        sessionStorage.setItem('routeTravelMode', route.mode || 'car');
        window.location.hash = '#/route-planner';
        setTimeout(() => window.dispatchEvent(new HashChangeEvent('hashchange')), 50);
      }
    });
  });

  if (window.lucide) window.lucide.createIcons();

  function renderPlacesTab(places) {
    if (places.length === 0) return emptyState('heart', 'No saved places yet', 'Browse destinations and tap the heart icon to save them here.', '#/explore');
    return `
      <div class="grid-3" style="gap: 20px;">
        ${places.map(p => `
          <div class="place-card" style="position: relative; cursor: pointer;">
            <div class="place-card-image" onclick="window.location.hash='#/place/${p.id}'">
              <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="place-card-body">
              <h3 class="place-card-title">${p.name}</h3>
              <div class="place-card-location flex-center gap-1" style="justify-content: flex-start;">
                <i data-lucide="map-pin" style="width: 12px; height: 12px; color: var(--text-muted);"></i>
                <span>${p.district}</span>
              </div>
            </div>
            <button class="btn-remove-place" data-id="${p.id}" style="position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,107,99,0.9); border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 5; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
              <i data-lucide="x" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderStatesTab(states) {
    if (states.length === 0) return emptyState('map-pin', 'No saved states yet', 'Explore states and save your favorites to plan future trips.', '#/explore');
    return `
      <div class="grid-3" style="gap: 20px;">
        ${states.map(s => `
          <div style="position: relative; background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); overflow: hidden; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 40px rgba(0,0,0,0.3)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
            <div onclick="window.location.hash='#/state/${s.id}'" style="padding: 24px;">
              <div style="font-size: 28px; margin-bottom: 8px;">${s.emoji || '🏔️'}</div>
              <h3 class="font-heading" style="font-size: 16px; margin-bottom: 4px;">${s.name}</h3>
              <p style="font-size: 12px; color: var(--text-muted);">${s.region} India • ${s.capital}</p>
            </div>
            <button class="btn-remove-state" data-id="${s.id}" style="position: absolute; top: 12px; right: 12px; width: 28px; height: 28px; border-radius: 50%; background: rgba(255,107,99,0.9); border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 5;">
              <i data-lucide="x" style="width: 12px; height: 12px;"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderRoutesTab(routes) {
    if (routes.length === 0) return emptyState('route', 'No saved routes yet', 'Go to the Route Planner, create an itinerary, and save it here.', '#/route-planner');
    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${routes.map(r => `
          <div class="saved-route-card" data-route-id="${r.id}" style="position: relative; background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); padding: 20px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='var(--accent-saffron)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='var(--glass-border)'; this.style.transform=''">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3 class="font-heading" style="font-size: 16px;">${r.name || 'Saved Route'}</h3>
              <span style="font-size: 11px; color: var(--text-muted);">${new Date(r.createdAt).toLocaleDateString('en-IN')}</span>
            </div>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 12px;">
              <span style="font-size: 12px; color: var(--accent-saffron); font-weight: 700;">${r.totalDistance} km</span>
              <span style="font-size: 12px; color: var(--accent-teal); font-weight: 700;">${r.mode}</span>
              <span style="font-size: 12px; color: var(--text-muted);">${r.stops?.length || 0} stops</span>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${(r.stops || []).map((s, i) => `
                <span style="font-size: 11px; background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); padding: 3px 8px; color: var(--text-secondary);">
                  ${i + 1}. ${s.name}
                </span>
              `).join('')}
            </div>
            <button class="btn-remove-route" data-id="${r.id}" style="position: absolute; top: 16px; right: 16px; width: 28px; height: 28px; border-radius: 50%; background: rgba(255,107,99,0.9); border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              <i data-lucide="x" style="width: 12px; height: 12px;"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  function emptyState(icon, title, desc, link) {
    return `
      <div class="text-center" style="padding: 60px 20px;">
        <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(255,107,53,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
          <i data-lucide="${icon}" style="width: 36px; height: 36px; color: var(--accent-saffron);"></i>
        </div>
        <h3 class="font-heading" style="margin-bottom: 8px; font-size: 18px;">${title}</h3>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">${desc}</p>
        <a href="${link}" class="btn btn-primary" style="border-radius: var(--radius-lg); padding: 10px 24px;">Start Exploring</a>
      </div>
    `;
  }
}
window.renderWishlistPage = renderWishlistPage;
