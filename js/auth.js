// ============================================================
//  Yatra — Client-side Auth & Wishlist Manager
//  Uses localStorage for persistent user data.
// ============================================================

const YatraAuth = {
  USERS_KEY: 'yatra_users',
  SESSION_KEY: 'yatra_session',

  // --- User Management ---
  _getUsers() {
    try { return JSON.parse(localStorage.getItem(this.USERS_KEY)) || {}; } 
    catch { return {}; }
  },

  _saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  signup(name, email, password) {
    if (!name || !email || !password) return { ok: false, error: 'All fields are required.' };
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    const emailLower = email.toLowerCase().trim();
    const users = this._getUsers();
    if (users[emailLower]) return { ok: false, error: 'An account with this email already exists.' };
    
    users[emailLower] = {
      name: name.trim(),
      email: emailLower,
      passwordHash: btoa(password), // Simple encoding (not production-grade)
      createdAt: new Date().toISOString(),
      wishlist: { places: [], states: [], routes: [] }
    };
    this._saveUsers(users);
    this._setSession(emailLower);
    return { ok: true };
  },

  login(email, password) {
    if (!email || !password) return { ok: false, error: 'Email and password are required.' };
    const emailLower = email.toLowerCase().trim();
    const users = this._getUsers();
    const user = users[emailLower];
    if (!user) return { ok: false, error: 'No account found with this email.' };
    if (user.passwordHash !== btoa(password)) return { ok: false, error: 'Incorrect password.' };
    
    this._setSession(emailLower);
    return { ok: true };
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  _setSession(email) {
    localStorage.setItem(this.SESSION_KEY, email);
  },

  getCurrentUser() {
    const email = localStorage.getItem(this.SESSION_KEY);
    if (!email) return null;
    const users = this._getUsers();
    return users[email] || null;
  },

  isLoggedIn() {
    return !!this.getCurrentUser();
  },

  // --- Wishlist Management ---
  _updateUser(fn) {
    const email = localStorage.getItem(this.SESSION_KEY);
    if (!email) return false;
    const users = this._getUsers();
    if (!users[email]) return false;
    if (!users[email].wishlist) users[email].wishlist = { places: [], states: [], routes: [] };
    fn(users[email]);
    this._saveUsers(users);
    return true;
  },

  toggleWishlistPlace(placeId) {
    let added = false;
    this._updateUser(user => {
      const idx = user.wishlist.places.indexOf(placeId);
      if (idx === -1) { user.wishlist.places.push(placeId); added = true; }
      else { user.wishlist.places.splice(idx, 1); added = false; }
    });
    return added;
  },

  toggleWishlistState(stateId) {
    let added = false;
    this._updateUser(user => {
      const idx = user.wishlist.states.indexOf(stateId);
      if (idx === -1) { user.wishlist.states.push(stateId); added = true; }
      else { user.wishlist.states.splice(idx, 1); added = false; }
    });
    return added;
  },

  saveRoute(routeData) {
    let added = false;
    this._updateUser(user => {
      // routeData: { id, name, stops: [{id, name}], mode, totalDistance, createdAt }
      user.wishlist.routes.push(routeData);
      added = true;
    });
    return added;
  },

  removeRoute(routeId) {
    this._updateUser(user => {
      user.wishlist.routes = user.wishlist.routes.filter(r => r.id !== routeId);
    });
  },

  isPlaceWishlisted(placeId) {
    const user = this.getCurrentUser();
    return user ? (user.wishlist?.places || []).includes(placeId) : false;
  },

  isStateWishlisted(stateId) {
    const user = this.getCurrentUser();
    return user ? (user.wishlist?.states || []).includes(stateId) : false;
  },

  getWishlist() {
    const user = this.getCurrentUser();
    return user ? (user.wishlist || { places: [], states: [], routes: [] }) : null;
  }
};

window.YatraAuth = YatraAuth;
