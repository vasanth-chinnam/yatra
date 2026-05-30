// ============================================================
//  Yatra — Hash-based SPA Router
//  Handles client-side navigation via hash fragments with
//  parameterized routes, query string parsing, and smooth
//  page transition animations.
// ============================================================

class Router {
  constructor() {
    /** @type {Array<{pattern: string, regex: RegExp, paramNames: string[], handler: Function}>} */
    this.routes = [];

    /** @type {string|null} Currently matched route pattern */
    this.currentRoute = null;

    /** @type {boolean} Prevents overlapping route transitions */
    this._transitioning = false;

    // Bind the hashchange listener
    this._onHashChange = () => this.handleRoute();
    window.addEventListener('hashchange', this._onHashChange);
  }

  // -----------------------------------------------------------
  //  addRoute — Register a route pattern with its handler
  //  Supports dynamic segments like /state/:id
  // -----------------------------------------------------------
  addRoute(pattern, handler) {
    if (typeof pattern !== 'string' || typeof handler !== 'function') {
      console.error(`[Router] Invalid route: pattern must be a string and handler must be a function.`);
      return this;
    }

    const paramNames = [];
    // Convert ':param' segments to capture groups
    // e.g., '/state/:id' → /^\/state\/([^/]+)$/
    const regexStr = pattern
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')  // Escape special regex chars first
      .replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, (_, name) => {
        paramNames.push(name);
        return '([^/]+)';
      });

    this.routes.push({
      pattern,
      regex: new RegExp(`^${regexStr}$`),
      paramNames,
      handler
    });

    return this; // Enable chaining
  }

  // -----------------------------------------------------------
  //  navigate — Programmatically navigate to a hash path
  // -----------------------------------------------------------
  navigate(path) {
    if (typeof path !== 'string') {
      console.error('[Router] navigate() requires a string path.');
      return;
    }
    window.location.hash = '#' + path;
  }

  // -----------------------------------------------------------
  //  getPath — Parse the current hash into path + query object
  // -----------------------------------------------------------
  getPath() {
    const hash = window.location.hash.slice(1) || '/';
    const questionMarkIndex = hash.indexOf('?');

    let path, queryString;
    if (questionMarkIndex !== -1) {
      path = hash.slice(0, questionMarkIndex);
      queryString = hash.slice(questionMarkIndex + 1);
    } else {
      path = hash;
      queryString = '';
    }

    // Parse query string into key-value pairs
    const query = {};
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const eqIndex = pair.indexOf('=');
        if (eqIndex === -1) {
          // Bare key, no value
          query[decodeURIComponent(pair)] = '';
        } else {
          const key = decodeURIComponent(pair.slice(0, eqIndex));
          const value = decodeURIComponent(pair.slice(eqIndex + 1));
          query[key] = value;
        }
      });
    }

    return { path, query };
  }

  // -----------------------------------------------------------
  //  handleRoute — Match the current path and invoke its handler
  //  with a smooth page-exit / page-enter transition
  // -----------------------------------------------------------
  handleRoute() {
    const { path, query } = this.getPath();

    for (const route of this.routes) {
      const match = path.match(route.regex);
      if (match) {
        // Build params object from captured groups
        const params = {};
        route.paramNames.forEach((name, i) => {
          params[name] = decodeURIComponent(match[i + 1]);
        });

        const routeContext = { params, query, path };
        const app = document.getElementById('page-content');

        if (app) {
          app.classList.add('page-exit');

          setTimeout(() => {
            try {
              const result = route.handler(routeContext);
              if (result && typeof result.catch === 'function') {
                result.catch(err => {
                  console.error(`[Router] Async error in handler for "${route.pattern}":`, err);
                  this._renderError(app, err);
                });
              }
            } catch (err) {
              console.error(`[Router] Error in handler for "${route.pattern}":`, err);
              this._renderError(app, err);
            }

            app.classList.remove('page-exit');
            app.classList.add('page-enter');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (typeof window.initScrollAnimations === 'function') {
              window.initScrollAnimations();
            }

            setTimeout(() => {
              app.classList.remove('page-enter');
            }, 500);
          }, 200);
        } else {
          // No page-content container — execute handler directly
          try {
            route.handler(routeContext);
          } catch (err) {
            console.error(`[Router] Error in handler for "${route.pattern}":`, err);
          }
          window.scrollTo({ top: 0 });
        }

        this.currentRoute = route.pattern;
        return;
      }
    }

    // No route matched — show 404
    this.show404();
  }

  // -----------------------------------------------------------
  //  show404 — Render a styled "page not found" screen
  // -----------------------------------------------------------
  show404() {
    const content = document.getElementById('page-content');
    if (content) {
      content.innerHTML = `
        <div class="error-page">
          <div class="error-page-inner">
            <span class="error-code text-gradient">404</span>
            <h2>Destination Not Found</h2>
            <p>Oops! This destination doesn't exist on our map yet. 
               Perhaps it's a hidden gem waiting to be discovered.</p>
            <a href="#/" class="btn-primary">
              <i data-lucide="home"></i>
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      `;

      // Initialize any Lucide icons in the 404 page
      if (typeof lucide !== 'undefined') {
        try { lucide.createIcons(); } catch (_) { /* silently ignore */ }
      }
    }
  }

  // -----------------------------------------------------------
  //  _renderError — Display a runtime-error screen (dev aid)
  // -----------------------------------------------------------
  _renderError(container, error) {
    container.innerHTML = `
      <div class="error-page">
        <div class="error-page-inner">
          <span class="error-code text-gradient">Error</span>
          <h2>Something Went Wrong</h2>
          <p>${error.message || 'An unexpected error occurred while loading this page.'}</p>
          <a href="#/" class="btn-primary">
            <i data-lucide="home"></i>
            <span>Back to Home</span>
          </a>
        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      try { lucide.createIcons(); } catch (_) { /* silently ignore */ }
    }
  }

  // -----------------------------------------------------------
  //  init — Bootstrap the router with the current hash
  // -----------------------------------------------------------
  init() {
    this.handleRoute();
    return this;
  }

  // -----------------------------------------------------------
  //  destroy — Clean up event listeners (for testing / teardown)
  // -----------------------------------------------------------
  destroy() {
    window.removeEventListener('hashchange', this._onHashChange);
    this.routes = [];
    this.currentRoute = null;
  }
}
window.Router = Router;
