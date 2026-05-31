// ============================================================
//  Yatra — Main Application Orchestrator (Standard Script)
//  Bootstraps the SPA: sets up the persistent app shell (navbar,
//  page content area, footer), registers all routes, and handles
//  global UI behaviours like scroll detection and active link styling.
// ============================================================

/**
 * Helper: get the #page-content container
 * @returns {HTMLElement}
 */
function getOutlet() {
  return document.getElementById('page-content');
}

/**
 * Helper: after injecting HTML, initialize Lucide icons
 */
function initIcons() {
  if (typeof lucide !== 'undefined') {
    try {
      lucide.createIcons();
    } catch (e) {
      console.warn('[Yatra] Lucide icon init failed:', e);
    }
  }
}

// ===============================================================
//  NAVBAR
// ===============================================================

function renderNavbar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  navbar.id = 'main-navbar';
  navbar.innerHTML = `
    <div class="navbar-inner">
      <a href="#/" class="navbar-logo" aria-label="Yatra Home">
        <span class="logo-icon">🧭</span>
        <span class="logo-text">Yatra</span>
      </a>

      <div class="nav-links" id="nav-links">
        <a href="#/explore" class="nav-link">
          <i data-lucide="compass" style="width: 16px; height: 16px;"></i>
          <span>Explore States</span>
        </a>
        <a href="#/categories" class="nav-link">
          <i data-lucide="layout-grid" style="width: 16px; height: 16px;"></i>
          <span>Categories</span>
        </a>
        <a href="#/route-planner" class="nav-link">
          <i data-lucide="map" style="width: 16px; height: 16px;"></i>
          <span>Route Planner</span>
        </a>
        <a href="blog.html" class="nav-link">
          <i data-lucide="book-open" style="width: 16px; height: 16px;"></i>
          <span>Blog</span>
        </a>
        <a href="#/search" class="nav-link">
          <i data-lucide="search" style="width: 16px; height: 16px;"></i>
          <span>Search</span>
        </a>
        <span id="nav-auth-slot"></span>
      </div>

      <div class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu" role="button" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- Mobile overlay -->
    <div class="nav-mobile-overlay" id="nav-mobile-overlay">
      <a href="#/explore" class="nav-link mobile-nav-link">Explore States</a>
      <a href="#/categories" class="nav-link mobile-nav-link">Categories</a>
      <a href="#/route-planner" class="nav-link mobile-nav-link">Route Planner</a>
      <a href="blog.html" class="nav-link mobile-nav-link">Blog</a>
      <a href="#/search" class="nav-link mobile-nav-link">Search</a>
    </div>
  `;
  return navbar;
}

/** Update auth slot in navbar */
function updateNavAuth() {
  const slot = document.getElementById('nav-auth-slot');
  if (!slot) return;
  if (window.YatraAuth && window.YatraAuth.isLoggedIn()) {
    const user = window.YatraAuth.getCurrentUser();
    slot.innerHTML = `
      <a href="#/wishlist" class="nav-link" style="display: flex; align-items: center; gap: 6px;">
        <div style="width: 26px; height: 26px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: white; font-family: var(--font-heading);">${user.name.charAt(0).toUpperCase()}</div>
        <span>${user.name.split(' ')[0]}</span>
      </a>
    `;
  } else {
    slot.innerHTML = `
      <a href="#/auth?mode=login" class="nav-link" style="display: flex; align-items: center; gap: 6px;">
        <i data-lucide="user" style="width: 16px; height: 16px;"></i>
        <span>Sign In</span>
      </a>
    `;
  }
  if (window.lucide) window.lucide.createIcons();
}

// ===============================================================
//  FOOTER
// ===============================================================

function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <!-- About Column -->
        <div class="footer-col">
          <a href="#/" class="navbar-logo footer-logo">
            <span class="logo-icon">🧭</span>
            <span class="logo-text">Yatra</span>
          </a>
          <p class="footer-about">
            Discover India's incredible diversity — explore 28 states and 8 union territories, 
            plan routes, and find hidden gems across the subcontinent.
          </p>
          <div class="footer-socials">
            <a href="#" class="footer-social-icon" aria-label="Twitter"><i data-lucide="twitter"></i></a>
            <a href="#" class="footer-social-icon" aria-label="Instagram"><i data-lucide="instagram"></i></a>
            <a href="#" class="footer-social-icon" aria-label="YouTube"><i data-lucide="youtube"></i></a>
            <a href="#" class="footer-social-icon" aria-label="GitHub"><i data-lucide="github"></i></a>
          </div>
        </div>

        <!-- Quick Links Column -->
        <div class="footer-col">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="#/">Home</a></li>
            <li><a href="#/explore">Explore States</a></li>
            <li><a href="#/categories">Categories</a></li>
            <li><a href="#/route-planner">Route Planner</a></li>
            <li><a href="#/search">Search</a></li>
          </ul>
        </div>

        <!-- Popular States Column -->
        <div class="footer-col">
          <h4 class="footer-heading">Popular States</h4>
          <ul class="footer-links">
            <li><a href="#/state/rajasthan">Rajasthan</a></li>
            <li><a href="#/state/kerala">Kerala</a></li>
            <li><a href="#/state/goa">Goa</a></li>
            <li><a href="#/state/himachal-pradesh">Himachal Pradesh</a></li>
            <li><a href="#/state/tamil-nadu">Tamil Nadu</a></li>
            <li><a href="#/state/uttarakhand">Uttarakhand</a></li>
          </ul>
        </div>

        <!-- Categories Column -->
        <div class="footer-col">
          <h4 class="footer-heading">Top Categories</h4>
          <ul class="footer-links">
            <li><a href="#/category/heritage">Heritage & Culture</a></li>
            <li><a href="#/category/temples">Temples & Spirituality</a></li>
            <li><a href="#/category/beaches">Beaches & Coastline</a></li>
            <li><a href="#/category/hill-stations">Hill Stations</a></li>
            <li><a href="#/category/wildlife">Wildlife & Nature</a></li>
            <li><a href="#/category/adventure">Adventure & Trekking</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom" style="display:flex; flex-direction:column; align-items:center; gap:10px; margin-top:20px; border-top:1px solid rgba(255,255,255,0.05); padding-top:20px;">
        <div style="display:flex; gap:20px; flex-wrap:wrap; justify-content:center;">
          <a href="about.html" style="color:#9CA3AF; font-size:13px; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9CA3AF'">About Yatra</a>
          <a href="blog.html" style="color:#9CA3AF; font-size:13px; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9CA3AF'">Travel Blog</a>
          <a href="privacy-policy.html" style="color:#9CA3AF; font-size:13px; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9CA3AF'">Privacy Policy</a>
          <a href="terms.html" style="color:#9CA3AF; font-size:13px; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9CA3AF'">Terms & Conditions</a>
          <a href="about.html#contact" style="color:#9CA3AF; font-size:13px; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9CA3AF'">Contact Us</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} Yatra — Discover India. Crafted with ❤️ for travelers.</p>
        <p style="font-size:11px; color:#4B5563; margin-top:2px;">Travel info is for inspiration only. Verify with local authorities before visiting.</p>
      </div>
    </div>
  `;
  return footer;
}

// ===============================================================
//  GLOBAL UI HELPERS
// ===============================================================

/** Scroll listener — add .nav-scrolled after 50px */
function setupScrollListener() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.classList.add('nav-scrolled');
        } else {
          navbar.classList.remove('nav-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/** Scroll-triggered fade-in animations for elements with .animate-on-scroll */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (elements.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('visible'));
  }
}
window.initScrollAnimations = initScrollAnimations;

/** Mobile hamburger menu toggle */
function setupMobileMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const overlay = document.getElementById('nav-mobile-overlay');
  if (!hamburger || !overlay) return;

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when a mobile nav link is clicked
  overlay.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Also handle keyboard activation
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
}

/** Update active nav link based on current hash */
function updateActiveNavLink() {
  const hash = window.location.hash || '#/';
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (hash === href || (href !== '#/' && hash.startsWith(href))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===============================================================
//  APP INITIALIZATION
// ===============================================================

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) {
    console.error('[Yatra] #app mount point not found.');
    return;
  }

  // 1. Build app shell: navbar → page-content → footer
  const navbar = renderNavbar();
  const pageContent = document.createElement('main');
  pageContent.id = 'page-content';
  pageContent.className = 'page-content';
  const footer = renderFooter();

  app.appendChild(navbar);
  app.appendChild(pageContent);
  app.appendChild(footer);

  // 2. Initialize icons for the shell
  initIcons();

  // 3. Setup global UI
  setupScrollListener();
  setupMobileMenu();

  // 4. Create router and register all routes
  const router = new Router();

  // Common stub functions passed to sub-pages to prevent rendering duplicate nav/footer
  const pageHelpers = {
    renderNavbar: () => "",
    renderFooter: () => ""
  };

  router
    .addRoute('/', (ctx) => {
      if (window.renderHomePage) {
        window.renderHomePage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/explore', (ctx) => {
      if (window.renderExplorePage) {
        window.renderExplorePage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/states', (ctx) => {
      if (window.renderExplorePage) {
        window.renderExplorePage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/state/:id', (ctx) => {
      if (window.renderStatePage) {
        window.renderStatePage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/place/:id', (ctx) => {
      if (window.renderPlacePage) {
        window.renderPlacePage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/route-planner', (ctx) => {
      if (window.renderRoutePlannerPage) {
        window.renderRoutePlannerPage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/categories', (ctx) => {
      if (window.renderCategoriesPage) {
        window.renderCategoriesPage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/category/:id', (ctx) => {
      if (window.renderCategoryPage) {
        window.renderCategoryPage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/search', (ctx) => {
      if (window.renderSearchPage) {
        window.renderSearchPage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/map', (ctx) => {
      if (window.renderMapPage) {
        window.renderMapPage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/auth', (ctx) => {
      if (window.renderAuthPage) {
        window.renderAuthPage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    })
    .addRoute('/wishlist', (ctx) => {
      if (window.renderWishlistPage) {
        window.renderWishlistPage(pageContent, ctx.params, ctx.query, pageHelpers);
      }
      updateActiveNavLink();
    });

  // 5. Boot the router
  router.init();

  // 6. Update auth slot on every navigation
  updateNavAuth();
  window.addEventListener('hashchange', () => { setTimeout(updateNavAuth, 300); });

  console.log('🧭 Yatra app initialized successfully with Offline/Local support.');
});
