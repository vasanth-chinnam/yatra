async function renderCategoryPage(outlet, params, query, { renderNavbar, renderFooter }) {
  const catId = params.id;
  const category = CATEGORIES.find(c => c.id === catId);

  if (!category) {
    outlet.innerHTML = `
      ${renderNavbar()}
      <main class="page flex-center section-padding" style="min-height:70vh;">
        <div class="text-center">
          <h2 class="text-gradient mb-3">Category Not Found</h2>
          <p class="mb-4">Let's find another travel category to explore!</p>
          <a href="#/categories" class="btn btn-primary">Back to Categories</a>
        </div>
      </main>
      ${renderFooter()}
    `;
    return;
  }

  // Get places in this category
  const categoryPlaces = getPlacesByCategory(catId);

  // Get unique states present in this category's places
  const availableStateIds = [...new Set(categoryPlaces.map(p => p.stateId))];
  const filterStates = STATES.filter(s => availableStateIds.includes(s.id));

  let activeStateId = 'all';

  // Render template
  renderTemplate();

  // Perform initial render of places
  renderFilteredPlaces();

  function renderTemplate() {
    outlet.innerHTML = `
      ${renderNavbar()}
      
      <main class="page">
        <section class="section-padding container">
          <!-- Category Header -->
          <div class="text-center mb-5 animate-on-scroll">
            <div class="flex-center mb-3" style="width: 60px; height: 60px; border-radius: var(--radius-full); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--glass-border); margin: 0 auto;">
              <i data-lucide="${category.icon || 'compass'}" style="width: 28px; height: 28px; color: ${category.color || 'var(--accent-saffron)'};"></i>
            </div>
            <h1 class="text-gradient font-heading mb-2">${category.name}</h1>
            <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto;">${category.description}</p>
          </div>

          <!-- State Filter Dropdown -->
          <div class="flex-between mb-4 flex-wrap gap-4" style="background: var(--bg-card); padding: var(--space-sm) var(--space-lg); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); backdrop-filter: blur(20px); justify-content: flex-end;">
            <div class="flex-center gap-2">
              <label for="category-state-select" style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-secondary);">Filter by State:</label>
              <select id="category-state-select" style="background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-full); color: var(--text-primary); padding: var(--space-xs) var(--space-xl); font-size: var(--font-size-xs); font-weight: 600; cursor: pointer;">
                <option value="all">All States & UTs</option>
                ${filterStates.map(state => `
                  <option value="${state.id}">${state.name}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Places Grid -->
          <div id="category-places-grid" class="grid-3 animate-on-scroll">
            <!-- Dynamic place cards here -->
          </div>
        </section>
      </main>

      ${renderFooter()}
    `;

    // Bind event listener to dropdown
    const select = outlet.querySelector('#category-state-select');
    if (select) {
      select.addEventListener('change', (e) => {
        activeStateId = e.target.value;
        renderFilteredPlaces();
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function renderFilteredPlaces() {
    const grid = outlet.querySelector('#category-places-grid');
    if (!grid) return;

    const filtered = activeStateId === 'all'
      ? categoryPlaces
      : categoryPlaces.filter(p => p.stateId === activeStateId);

    if (filtered.length === 0) {
      grid.className = 'flex-center section-padding';
      grid.innerHTML = `
        <div class="text-center">
          <i data-lucide="map-pin-off" style="width: 48px; height: 48px; color: var(--text-muted); margin: 0 auto var(--space-md);"></i>
          <h3>No Places Found</h3>
          <p style="color: var(--text-muted);">No destinations matched the selected state.</p>
        </div>
      `;
    } else {
      grid.className = 'grid-3';
      grid.innerHTML = filtered.map(p => {
        const state = STATES.find(s => s.id === p.stateId);
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
window.renderCategoryPage = renderCategoryPage;
