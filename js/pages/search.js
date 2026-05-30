async function renderSearchPage(outlet, params, query, { renderNavbar, renderFooter }) {
  let searchVal = query.q ? query.q.trim() : '';
  let selectedCategory = 'all';
  let selectedState = 'all';
  let selectedRating = 0;
  let selectedBudget = 'all';
  let selectedAdventure = 'all';
  let sortBy = 'rating'; // rating | name

  // Initial render
  renderTemplate();

  // Execute initial search and render
  performSearch();

  function renderTemplate() {
    outlet.innerHTML = `
      ${renderNavbar()}
      
      <main class="page">
        <section class="section-padding container">
          <!-- Page Header Search Bar -->
          <div class="text-center mb-5 animate-on-scroll">
            <h1 class="text-gradient font-heading mb-3">Search Destinations</h1>
            <div class="search-bar-wrapper" style="max-width: 600px; width: 100%; margin: 0 auto;">
              <form id="search-page-form" class="flex-center w-full relative">
                <input type="text" id="search-page-input" class="search-input w-full p-3 pr-5" placeholder="Search by name, state, capital, or style..." value="${searchVal}" style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-full); color: var(--text-primary); padding-left: var(--space-2xl); font-size: var(--font-size-md);">
                <i data-lucide="search" style="position: absolute; left: var(--space-lg); color: var(--text-muted); width: 18px; height: 18px;"></i>
                <button type="submit" class="btn btn-primary" style="position: absolute; right: var(--space-xs); border-radius: var(--radius-full); padding: var(--space-xs) var(--space-lg);">Search</button>
              </form>
            </div>
          </div>

          <!-- Main Layout: Sidebar Filters + Results Grid -->
          <div class="grid-3 animate-on-scroll" style="gap: var(--space-xl); align-items: start;">
            <!-- Filter Sidebar -->
            <div class="filter-panel" style="padding: var(--space-xl); border-radius: var(--radius-xl); border: 1px solid var(--glass-border); background: var(--bg-card); backdrop-filter: blur(20px);">
              <div class="flex-between mb-4" style="align-items: center; border-bottom: 1px solid var(--glass-border); padding-bottom: var(--space-sm);">
                <h3 class="font-heading" style="font-size: var(--font-size-md); font-weight: 700; color: var(--text-primary);"><i data-lucide="sliders-horizontal" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:var(--space-xs);"></i> Filters</h3>
                <button id="search-reset-btn" style="background: none; border: none; color: var(--accent-saffron); font-size: 11px; font-weight: 700; cursor: pointer;">Reset All</button>
              </div>

              <!-- Category -->
              <div class="mb-4">
                <label for="filter-category" style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: var(--space-xs);">Category</label>
                <select id="filter-category" style="background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); width: 100%; cursor: pointer;">
                  <option value="all">All Categories</option>
                  ${CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>
              </div>

              <!-- State -->
              <div class="mb-4">
                <label for="filter-state" style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: var(--space-xs);">State & UT</label>
                <select id="filter-state" style="background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); width: 100%; cursor: pointer;">
                  <option value="all">All States & UTs</option>
                  ${STATES.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                </select>
              </div>

              <!-- Min Rating -->
              <div class="mb-4">
                <label for="filter-rating" style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: var(--space-xs);">Minimum Rating</label>
                <select id="filter-rating" style="background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); width: 100%; cursor: pointer;">
                  <option value="0">Any Rating</option>
                  <option value="4.7">4.7 ★ & above</option>
                  <option value="4.5">4.5 ★ & above</option>
                  <option value="4.0">4.0 ★ & above</option>
                </select>
              </div>

              <!-- Budget Level -->
              <div class="mb-4">
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: var(--space-xs);">Budget Profile</label>
                <select id="filter-budget" style="background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); width: 100%; cursor: pointer;">
                  <option value="all">Any Budget</option>
                  <option value="budget">Budget (₹)</option>
                  <option value="mid">Mid-Range (₹₹)</option>
                  <option value="luxury">Luxury (₹₹₹)</option>
                </select>
              </div>

              <!-- Adventure Level -->
              <div class="mb-4">
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: var(--space-xs);">Adventure Level</label>
                <select id="filter-adventure" style="background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); width: 100%; cursor: pointer;">
                  <option value="all">Any Level</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
            </div>

            <!-- Results Grid Column -->
            <div style="grid-column: span 2;">
              <!-- Sort / Stats Bar -->
              <div class="flex-between mb-4 flex-wrap gap-2" style="align-items: center; border-bottom: 1px solid var(--glass-border); padding-bottom: var(--space-sm);">
                <div id="search-stats-text" style="font-size: var(--font-size-sm); color: var(--text-secondary); font-weight: 600;">
                  Finding results...
                </div>
                
                <div class="flex-center gap-2" style="align-items: center;">
                  <label for="search-sort" style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Sort by:</label>
                  <select id="search-sort" style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-full); color: var(--text-primary); padding: 4px var(--space-lg); font-size: var(--font-size-xs); font-weight: 600; cursor: pointer;">
                    <option value="rating">Rating (High to Low)</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>

              <!-- Results Grid -->
              <div id="search-places-grid" class="grid-2">
                <!-- Place cards dynamically populated -->
              </div>
            </div>
          </div>
        </section>
      </main>

      ${renderFooter()}
    `;

    // Bind event listeners
    const form = outlet.querySelector('#search-page-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        searchVal = document.getElementById('search-page-input').value.trim();
        performSearch();
      });
    }

    const cat = outlet.querySelector('#filter-category');
    if (cat) cat.addEventListener('change', (e) => { selectedCategory = e.target.value; performSearch(); });

    const state = outlet.querySelector('#filter-state');
    if (state) state.addEventListener('change', (e) => { selectedState = e.target.value; performSearch(); });

    const rating = outlet.querySelector('#filter-rating');
    if (rating) rating.addEventListener('change', (e) => { selectedRating = parseFloat(e.target.value); performSearch(); });

    const budget = outlet.querySelector('#filter-budget');
    if (budget) budget.addEventListener('change', (e) => { selectedBudget = e.target.value; performSearch(); });

    const adventure = outlet.querySelector('#filter-adventure');
    if (adventure) adventure.addEventListener('change', (e) => { selectedAdventure = e.target.value; performSearch(); });

    const sort = outlet.querySelector('#search-sort');
    if (sort) sort.addEventListener('change', (e) => { sortBy = e.target.value; performSearch(); });

    const resetBtn = outlet.querySelector('#search-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (cat) cat.value = 'all';
        if (state) state.value = 'all';
        if (rating) rating.value = '0';
        if (budget) budget.value = 'all';
        if (adventure) adventure.value = 'all';
        
        selectedCategory = 'all';
        selectedState = 'all';
        selectedRating = 0;
        selectedBudget = 'all';
        selectedAdventure = 'all';
        
        performSearch();
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function performSearch() {
    const grid = outlet.querySelector('#search-places-grid');
    const statsText = outlet.querySelector('#search-stats-text');
    
    if (!grid) return;

    // Apply text search
    let results = searchVal === '' ? ALL_PLACES : searchPlaces(searchVal);

    // Apply sidebar filters
    results = results.filter(p => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory || (p.subcategories && p.subcategories.includes(selectedCategory));
      const matchesState = selectedState === 'all' || p.stateId === selectedState;
      const matchesRating = p.rating >= selectedRating;
      const matchesBudget = selectedBudget === 'all' || p.budgetLevel === selectedBudget;
      const matchesAdventure = selectedAdventure === 'all' || p.adventureLevel === selectedAdventure;

      return matchesCat && matchesState && matchesRating && matchesBudget && matchesAdventure;
    });

    // Apply sort
    if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Update stats bar
    if (statsText) {
      statsText.innerHTML = `Found <strong>${results.length}</strong> travel destinations`;
    }

    // Render cards
    if (results.length === 0) {
      grid.className = 'flex-center section-padding';
      grid.innerHTML = `
        <div class="text-center" style="grid-column: span 2;">
          <i data-lucide="map-pin-off" style="width: 48px; height: 48px; color: var(--text-muted); margin: 0 auto var(--space-md);"></i>
          <h3>No Destinations Match Your Query</h3>
          <p style="color: var(--text-muted); margin-top: var(--space-xs)">Try clearing filters or search for another region.</p>
        </div>
      `;
    } else {
      grid.className = 'grid-2';
      grid.innerHTML = results.map(p => {
        const state = STATES.find(s => s.id === p.stateId);
        const cat = CATEGORIES.find(c => c.id === p.category);
        const stars = Array(5).fill(0).map((_, i) => 
          `<i data-lucide="star" style="width: 14px; height: 14px; fill: ${i < Math.floor(p.rating) ? 'var(--accent-gold)' : 'none'}; color: var(--accent-gold);"></i>`
        ).join('');

        return `
          <div class="place-card" onclick="window.location.hash='#/place/${p.id}'" style="cursor: pointer;">
            <div class="place-card-image">
              <img src="${p.image}" alt="${p.name}">
              <span class="badge" style="background: rgba(10, 14, 26, 0.7); border: 1px solid var(--glass-border); color: var(--accent-saffron); font-weight: 700;">
                ${state?.name || p.stateId}
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
}
window.renderSearchPage = renderSearchPage;
