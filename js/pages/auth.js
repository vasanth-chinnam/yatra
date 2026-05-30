// ============================================================
//  Yatra — Auth Page (Login / Signup)
// ============================================================

async function renderAuthPage(outlet, params, query, { renderNavbar, renderFooter }) {
  const mode = query.mode === 'signup' ? 'signup' : 'login';

  // If already logged in, redirect to wishlist
  if (YatraAuth.isLoggedIn()) {
    window.location.hash = '#/wishlist';
    return;
  }

  outlet.innerHTML = `
    ${renderNavbar()}
    <main class="page">
      <section class="section-padding" style="min-height: 80vh; display: flex; align-items: center; justify-content: center;">
        <div class="auth-container animate-on-scroll" style="width: 100%; max-width: 460px;">
          
          <!-- Auth Card -->
          <div style="background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-2xl); padding: 40px; backdrop-filter: blur(30px); box-shadow: 0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);">
            
            <!-- Logo -->
            <div class="text-center mb-4">
              <div style="font-size: 48px; margin-bottom: 8px;">🧭</div>
              <h1 class="font-heading text-gradient" style="font-size: var(--font-size-xl); margin-bottom: 4px;">${mode === 'login' ? 'Welcome Back' : 'Join Yatra'}</h1>
              <p style="color: var(--text-muted); font-size: var(--font-size-sm);">
                ${mode === 'login' ? 'Sign in to access your wishlisted places and saved routes.' : 'Create your account to save favourite places and routes.'}
              </p>
            </div>

            <!-- Tab Switcher -->
            <div style="display: flex; background: var(--bg-primary); border-radius: var(--radius-lg); padding: 4px; margin-bottom: 28px; border: 1px solid var(--glass-border);">
              <a href="#/auth?mode=login" id="tab-login" style="flex: 1; text-align: center; padding: 10px; border-radius: var(--radius-md); font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.3s; cursor: pointer;
                ${mode === 'login' ? 'background: var(--gradient-primary); color: var(--text-inverse);' : 'background: transparent; color: var(--text-muted);'}">
                Sign In
              </a>
              <a href="#/auth?mode=signup" id="tab-signup" style="flex: 1; text-align: center; padding: 10px; border-radius: var(--radius-md); font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.3s; cursor: pointer;
                ${mode === 'signup' ? 'background: var(--gradient-primary); color: var(--text-inverse);' : 'background: transparent; color: var(--text-muted);'}">
                Sign Up
              </a>
            </div>

            <!-- Error Message -->
            <div id="auth-error" style="display: none; background: rgba(255,107,99,0.08); border: 1px solid rgba(255,107,99,0.25); border-radius: var(--radius-md); padding: 10px 14px; margin-bottom: 20px; font-size: 12px; color: var(--accent-coral); font-weight: 600; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
              <span id="auth-error-text"></span>
            </div>

            <!-- Form -->
            <form id="auth-form" style="display: flex; flex-direction: column; gap: 16px;">
              ${mode === 'signup' ? `
                <div>
                  <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 6px;">Full Name</label>
                  <div style="position: relative;">
                    <i data-lucide="user" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--text-muted);"></i>
                    <input type="text" id="auth-name" placeholder="Enter your full name" required
                      style="width: 100%; padding: 12px 14px 12px 40px; background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); font-size: 14px; outline: none; transition: border-color 0.3s; box-sizing: border-box;"
                      onfocus="this.style.borderColor='var(--accent-saffron)'" onblur="this.style.borderColor='var(--glass-border)'">
                  </div>
                </div>
              ` : ''}

              <div>
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 6px;">Email Address</label>
                <div style="position: relative;">
                  <i data-lucide="mail" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--text-muted);"></i>
                  <input type="email" id="auth-email" placeholder="you@example.com" required
                    style="width: 100%; padding: 12px 14px 12px 40px; background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); font-size: 14px; outline: none; transition: border-color 0.3s; box-sizing: border-box;"
                    onfocus="this.style.borderColor='var(--accent-saffron)'" onblur="this.style.borderColor='var(--glass-border)'">
                </div>
              </div>

              <div>
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 6px;">Password</label>
                <div style="position: relative;">
                  <i data-lucide="lock" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--text-muted);"></i>
                  <input type="password" id="auth-password" placeholder="${mode === 'signup' ? 'Min 6 characters' : 'Enter your password'}" required minlength="6"
                    style="width: 100%; padding: 12px 14px 12px 40px; background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); color: var(--text-primary); font-size: 14px; outline: none; transition: border-color 0.3s; box-sizing: border-box;"
                    onfocus="this.style.borderColor='var(--accent-saffron)'" onblur="this.style.borderColor='var(--glass-border)'">
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-full" style="padding: 14px; border-radius: var(--radius-lg); font-weight: 700; font-size: 14px; margin-top: 8px; box-shadow: 0 4px 20px rgba(255, 107, 53, 0.25); display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i data-lucide="${mode === 'login' ? 'log-in' : 'user-plus'}" style="width: 18px; height: 18px;"></i>
                ${mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <!-- Switch Mode -->
            <p class="text-center" style="margin-top: 24px; font-size: 13px; color: var(--text-muted);">
              ${mode === 'login' 
                ? `Don't have an account? <a href="#/auth?mode=signup" style="color: var(--accent-saffron); text-decoration: none; font-weight: 700;">Sign Up</a>` 
                : `Already have an account? <a href="#/auth?mode=login" style="color: var(--accent-saffron); text-decoration: none; font-weight: 700;">Sign In</a>`}
            </p>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}
  `;

  // Bind form
  const form = outlet.querySelector('#auth-form');
  const errorDiv = outlet.querySelector('#auth-error');
  const errorText = outlet.querySelector('#auth-error-text');

  function showError(msg) {
    errorDiv.style.display = 'flex';
    errorText.textContent = msg;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      errorDiv.style.display = 'none';

      const email = outlet.querySelector('#auth-email').value;
      const password = outlet.querySelector('#auth-password').value;

      let result;
      if (mode === 'signup') {
        const name = outlet.querySelector('#auth-name').value;
        result = YatraAuth.signup(name, email, password);
      } else {
        result = YatraAuth.login(email, password);
      }

      if (result.ok) {
        // Trigger navbar update and redirect
        window.location.hash = '#/wishlist';
        // Force full page re-render to update navbar
        setTimeout(() => window.dispatchEvent(new HashChangeEvent('hashchange')), 50);
      } else {
        showError(result.error);
      }
    });
  }

  if (window.lucide) window.lucide.createIcons();
}
window.renderAuthPage = renderAuthPage;
