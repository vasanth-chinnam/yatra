async function renderHomePage(outlet, params, query, { renderNavbar, renderFooter }) {
  // Get counts
  const placeCount = ALL_PLACES.length;
  const stateCount = STATES.length;
  const categoryCount = CATEGORIES.length;

  // Filter 8 featured states (first 8 for featured)
  const featuredStates = STATES.slice(0, 8);

  outlet.innerHTML = `
    ${renderNavbar()}
    
    <!-- Hero Section -->
    <section class="hero-section" style="background-image: linear-gradient(180deg, rgba(10, 14, 26, 0.4) 0%, rgba(10, 14, 26, 0.9) 100%), url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&fit=crop&q=80')">
      <div class="container hero-content animate-on-scroll">
        <h1 class="text-gradient mb-3">Discover India</h1>
        <p class="section-subtitle mb-5" style="color: var(--text-primary); font-size: var(--font-size-xl);">One State at a Time</p>
        
        <!-- Animated stats -->
        <div class="flex-center gap-5 mb-5 flex-wrap">
          <div class="text-center">
            <h3 class="text-accent-saffron font-heading" style="font-size: var(--font-size-3xl); font-weight: 800;">${placeCount}+</h3>
            <p style="font-size: var(--font-size-sm); color: var(--text-secondary)">Famous Places</p>
          </div>
          <div class="text-center" style="border-left: 1px solid var(--glass-border); padding-left: var(--space-xl);">
            <h3 class="text-accent-gold font-heading" style="font-size: var(--font-size-3xl); font-weight: 800;">${stateCount}</h3>
            <p style="font-size: var(--font-size-sm); color: var(--text-secondary)">States & UTs</p>
          </div>
          <div class="text-center" style="border-left: 1px solid var(--glass-border); padding-left: var(--space-xl);">
            <h3 class="text-accent-teal font-heading" style="font-size: var(--font-size-3xl); font-weight: 800;">${categoryCount}</h3>
            <p style="font-size: var(--font-size-sm); color: var(--text-secondary)">Categories</p>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="hero-search-wrapper" style="max-width: 600px; width: 100%; margin: 0 auto;">
          <form id="hero-search-form" class="flex-center w-full relative">
            <input type="text" id="hero-search-input" class="search-input w-full p-4 pr-5" placeholder="Search destinations, states, or categories..." style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-full); color: var(--text-primary); padding-left: var(--space-2xl); font-size: var(--font-size-md);">
            <i data-lucide="search" style="position: absolute; left: var(--space-lg); color: var(--text-muted); width: 20px; height: 20px;"></i>
            <button type="submit" class="btn btn-primary" style="position: absolute; right: var(--space-xs); border-radius: var(--radius-full); padding: var(--space-sm) var(--space-xl);">Explore</button>
          </form>
        </div>
      </div>
    </section>

    <!-- Featured States Section -->
    <section class="section-padding container">
      <div class="flex-between mb-4">
        <div>
          <h2 class="font-heading text-gradient" style="font-size: var(--font-size-2xl);">Explore Indian States</h2>
          <p style="color: var(--text-secondary);">Browse states and union territories</p>
        </div>
        <a href="#/explore" class="btn btn-secondary flex-center gap-2">
          View All <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
        </a>
      </div>

      <div class="states-scroll-container" style="display: flex; gap: var(--space-lg); overflow-x: auto; padding: var(--space-md) var(--space-xs) var(--space-xl); scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
        ${featuredStates.map(state => `
          <div class="state-card relative overflow-hidden" onclick="window.location.hash='#/state/${state.id}'" style="flex: 0 0 280px; height: 380px; border-radius: var(--radius-xl); cursor: pointer; transition: transform var(--transition-normal), box-shadow var(--transition-normal); border: 1px solid var(--glass-border); scroll-snap-align: start;">
            <img src="${state.image}" alt="${state.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow);">
            <div class="state-card-overlay">
              <span class="badge" style="background: var(--accent-saffron); color: var(--text-inverse); font-weight: 700; text-transform: uppercase; font-size: 10px; margin-bottom: auto; align-self: flex-start;">${state.type}</span>
              <h3 class="state-card-title">${state.name}</h3>
              <p class="state-card-count flex-center gap-1" style="justify-content: flex-start; color: var(--text-secondary); font-size: var(--font-size-sm);">
                <i data-lucide="map-pin" style="width: 14px; height: 14px; color: var(--accent-gold);"></i> ${state.placeCount} Destinations
              </p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Popular Categories -->
    <section class="section-padding" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="font-heading text-gradient" style="font-size: var(--font-size-2xl);">Browse by Category</h2>
          <p style="color: var(--text-secondary); max-width: 600px; margin: var(--space-sm) auto 0;">Whatever your travel style, we have the perfect itinerary mapped out.</p>
        </div>

        <div class="grid-4">
          ${CATEGORIES.map(cat => `
            <div class="category-card" onclick="window.location.hash='#/category/${cat.id}'" style="text-align: center; padding: var(--space-xl); background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); cursor: pointer; transition: all var(--transition-normal);">
              <div class="flex-center mb-3" style="width: 60px; height: 60px; border-radius: var(--radius-full); background: rgba(255, 255, 255, 0.05); margin: 0 auto; border: 1px solid var(--glass-border);">
                <i data-lucide="${cat.icon || 'compass'}" style="width: 28px; height: 28px; color: ${cat.color || '#FF6B35'};"></i>
              </div>
              <h3 class="mb-2" style="font-size: var(--font-size-md); font-weight: 700;">${cat.name}</h3>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); line-height: 1.4;">${cat.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Google AdSense Horizontal Banner Placeholder -->
    <div class="container" style="margin-top: var(--space-xl); margin-bottom: -10px;">
      <div class="ad-slot">
        <div class="ad-slot-label">Advertisement</div>
        <div style="min-height: 90px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); font-size: 13px;">
          <i data-lucide="layout" style="width: 24px; height: 24px; margin-bottom: 6px; color: rgba(255,255,255,0.15);"></i>
          <span>Responsive Google AdSense Display Unit (728x90 or Auto)</span>
        </div>
      </div>
    </div>

    <!-- Smart Route Planner CTA -->
    <section class="section-padding container">
      <div class="route-cta-wrapper" style="background: linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 201, 72, 0.05) 100%); border: 1px solid var(--glass-border); border-radius: var(--radius-2xl); padding: var(--space-3xl) var(--space-xl); text-align: center; backdrop-filter: blur(20px);">
        <div style="max-width: 600px; margin: 0 auto;">
          <div class="flex-center mb-4" style="width: 70px; height: 70px; border-radius: var(--radius-full); background: var(--gradient-primary); color: var(--text-inverse); margin: 0 auto; box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);">
            <i data-lucide="map" style="width: 32px; height: 32px;"></i>
          </div>
          <h2 class="font-heading text-gradient mb-3" style="font-size: var(--font-size-3xl);">Plan Your Perfect Route</h2>
          <p class="mb-4" style="color: var(--text-secondary); line-height: 1.6;">Our smart algorithm analyzes your selected destinations in any state, calculates distances, and charts the most efficient multi-day travel route complete with times, modes, and cost estimates.</p>
          <a href="#/route-planner" class="btn btn-primary btn-lg flex-center gap-2" style="display: inline-flex; border-radius: var(--radius-full);">
            <i data-lucide="navigation" style="width: 18px; height: 18px;"></i> Try Smart Route Planner
          </a>
        </div>
      </div>
    </section>

    <!-- Explore by Region -->
    <section class="section-padding" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="font-heading text-gradient" style="font-size: var(--font-size-2xl);">Explore by Region</h2>
          <p style="color: var(--text-secondary);">Filter states and places by their geographic region</p>
        </div>

        <div class="grid-3">
          ${['North', 'South', 'East', 'West', 'Central', 'Northeast'].map(region => {
            const count = STATES.filter(s => s.region.toLowerCase() === region.toLowerCase()).length;
            const regionIcons = {
              'North': 'mountain-snow',
              'South': 'waves',
              'East': 'sun',
              'West': 'sunset',
              'Central': 'compass',
              'Northeast': 'trees'
            };
            return `
              <div class="region-card flex-between" onclick="window.location.hash='#/explore?region=${region.toLowerCase()}'" style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); padding: var(--space-xl); cursor: pointer; transition: all var(--transition-normal); align-items: center;">
                <div class="flex-center gap-3">
                  <div class="flex-center" style="width: 48px; height: 48px; border-radius: var(--radius-lg); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--glass-border);">
                    <i data-lucide="${regionIcons[region] || 'map'}" style="width: 22px; height: 22px; color: var(--accent-saffron);"></i>
                  </div>
                  <div>
                    <h3 style="font-size: var(--font-size-md); font-weight: 700;">${region} India</h3>
                    <p style="font-size: var(--font-size-xs); color: var(--text-muted);">${count} States & UTs</p>
                  </div>
                </div>
                <i data-lucide="chevron-right" style="color: var(--text-muted); width: 20px; height: 20px;"></i>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;

  // Attach search event
  const searchForm = document.getElementById('hero-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = document.getElementById('hero-search-input').value.trim();
      if (q) {
        window.location.hash = `#/search?q=${encodeURIComponent(q)}`;
      }
    });
  }

  // Re-create Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
window.renderHomePage = renderHomePage;
