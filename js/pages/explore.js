async function renderExplorePage(outlet, params, query, { renderNavbar, renderFooter }) {
  // Read initial region from query string if present
  let activeRegion = query.region ? query.region.toLowerCase() : 'all';

  // Render initial template
  renderTemplate();

  // Perform initial filter
  filterStates();

  function renderTemplate() {
    outlet.innerHTML = `
      ${renderNavbar()}
      
      <main class="page">
        <section class="section-padding container">
          <div class="text-center mb-5 animate-on-scroll">
            <h1 class="text-gradient font-heading mb-3">All States & Union Territories</h1>
            <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto;">Discover the unique culture, heritage, and landscapes across India's 36 administrative regions.</p>
          </div>

          <!-- Filters Row -->
          <div class="flex-between mb-5 flex-wrap gap-4" style="background: var(--bg-card); padding: var(--space-md) var(--space-lg); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); backdrop-filter: blur(20px);">
            <!-- Region Tabs -->
            <div class="region-tabs flex-center gap-2 flex-wrap" style="justify-content: flex-start;">
              ${['All', 'North', 'South', 'East', 'West', 'Central', 'Northeast', 'Islands'].map(region => `
                <button class="btn ${activeRegion === region.toLowerCase() ? 'btn-primary' : 'btn-secondary'}" data-region="${region.toLowerCase()}" style="border-radius: var(--radius-full); padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); font-weight: 600;">
                  ${region}
                </button>
              `).join('')}
            </div>

            <!-- Search Field -->
            <div class="search-field relative" style="width: 100%; max-width: 320px;">
              <input type="text" id="state-search-input" placeholder="Search state or capital..." style="background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-full); color: var(--text-primary); padding: var(--space-sm) var(--space-xl); padding-left: var(--space-2xl); font-size: var(--font-size-sm); width: 100%;">
              <i data-lucide="search" style="position: absolute; left: var(--space-lg); top: 50%; transform: translateY(-50%); color: var(--text-muted); width: 16px; height: 16px;"></i>
            </div>
          </div>

          <!-- States Grid -->
          <div id="states-grid" class="grid-4 animate-on-scroll">
            <!-- Dynamic States cards here -->
          </div>

          <!-- Stats Bar -->
          <div id="explore-stats-bar" class="text-center mt-5 p-3" style="font-size: var(--font-size-sm); color: var(--text-muted); border-top: 1px solid var(--glass-border);">
            <!-- Dynamic stats here -->
          </div>
        </section>
      </main>

      ${renderFooter()}
    `;

    // Bind event listeners
    const tabs = outlet.querySelectorAll('.region-tabs button');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('btn-primary');
          t.classList.add('btn-secondary');
        });
        tab.classList.remove('btn-secondary');
        tab.classList.add('btn-primary');
        
        activeRegion = tab.getAttribute('data-region');
        filterStates();
      });
    });

    const searchInput = outlet.querySelector('#state-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        filterStates();
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function filterStates() {
    const searchVal = (outlet.querySelector('#state-search-input')?.value || '').toLowerCase().trim();
    const grid = outlet.querySelector('#states-grid');
    const statsBar = outlet.querySelector('#explore-stats-bar');
    
    if (!grid) return;

    // Filter states
    const filtered = STATES.filter(state => {
      const matchesRegion = activeRegion === 'all' || state.region.toLowerCase() === activeRegion;
      const matchesSearch = state.name.toLowerCase().includes(searchVal) || state.capital.toLowerCase().includes(searchVal);
      return matchesRegion && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.className = 'flex-center section-padding';
      grid.innerHTML = `
        <div class="text-center">
          <i data-lucide="map-pin-off" style="width: 48px; height: 48px; color: var(--text-muted); margin: 0 auto var(--space-md);"></i>
          <h3>No Destinations Found</h3>
          <p style="color: var(--text-muted); margin-top: var(--space-xs)">Try broadening your search or region filters.</p>
        </div>
      `;
    } else {
      grid.className = 'grid-4';
      grid.innerHTML = filtered.map(state => `
        <div class="state-card relative overflow-hidden" onclick="window.location.hash='#/state/${state.id}'" style="height: 380px; border-radius: var(--radius-xl); cursor: pointer; transition: transform var(--transition-normal), box-shadow var(--transition-normal); border: 1px solid var(--glass-border);">
          <img src="${state.image}" alt="${state.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow);">
          <div class="state-card-overlay">
            <span class="badge" style="background: var(--accent-saffron); color: var(--text-inverse); font-weight: 700; text-transform: uppercase; font-size: 10px; margin-bottom: auto; align-self: flex-start;">${state.type}</span>
            <span class="badge" style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--glass-border); color: var(--text-primary); font-weight: 600; text-transform: capitalize; font-size: 10px; margin-bottom: var(--space-xs); align-self: flex-start; right: var(--space-md); left: auto;">Region: ${state.region}</span>
            <h3 class="state-card-title">${state.name}</h3>
            <div class="flex-between w-full" style="align-items: center; color: var(--text-secondary); font-size: var(--font-size-sm);">
              <span class="flex-center gap-1">
                <i data-lucide="map-pin" style="width: 14px; height: 14px; color: var(--accent-gold);"></i> ${state.placeCount} Places
              </span>
              <span style="font-size: var(--font-size-xs); color: var(--text-muted);">Capital: ${state.capital}</span>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Update stats bar
    const totalPlaces = filtered.reduce((sum, s) => sum + s.placeCount, 0);
    if (statsBar) {
      statsBar.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${STATES.length}</strong> States & UTs — covering <strong>${totalPlaces}+</strong> total travel destinations.`;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}
window.renderExplorePage = renderExplorePage;
