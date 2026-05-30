async function renderCategoriesPage(outlet, params, query, { renderNavbar, renderFooter }) {
  outlet.innerHTML = `
    ${renderNavbar()}
    
    <main class="page">
      <section class="section-padding container">
        <div class="text-center mb-5 animate-on-scroll">
          <h1 class="text-gradient font-heading mb-3">Browse by Category</h1>
          <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto;">Select a travel style to view curated historical monuments, hill stations, spiritual sanctuaries, beaches, and off-beat gems across India.</p>
        </div>

        <div class="grid-3 animate-on-scroll">
          ${CATEGORIES.map(cat => {
            // Count total places in this category
            const count = ALL_PLACES.filter(p => p.category === cat.id || (p.subcategories && p.subcategories.includes(cat.id))).length;
            
            return `
              <div class="category-card" onclick="window.location.hash='#/category/${cat.id}'" style="text-align: left; padding: var(--space-xl); background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); cursor: pointer; transition: all var(--transition-normal); display: flex; flex-direction: column; height: 100%;">
                <div class="flex-between w-full mb-4" style="align-items: center;">
                  <div class="flex-center" style="width: 52px; height: 52px; border-radius: var(--radius-lg); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--glass-border);">
                    <i data-lucide="${cat.icon || 'compass'}" style="width: 24px; height: 24px; color: ${cat.color || 'var(--accent-saffron)'};"></i>
                  </div>
                  <span class="badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-secondary); border: 1px solid var(--glass-border); font-weight: 700;">
                    ${count} Places
                  </span>
                </div>
                <h3 class="mb-2" style="font-size: var(--font-size-md); font-weight: 700;">${cat.name}</h3>
                <p style="font-size: var(--font-size-sm); color: var(--text-secondary); line-height: 1.5; margin-bottom: var(--space-lg); flex-grow: 1;">
                  ${cat.description}
                </p>
                <div class="flex-center gap-1 text-accent-saffron" style="justify-content: flex-start; font-size: var(--font-size-xs); font-weight: 700;">
                  Explore category <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    </main>

    ${renderFooter()}
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
window.renderCategoriesPage = renderCategoriesPage;
