const ALL_PLACES = [
  ...window.placesSouth,
  ...window.placesNorth,
  ...window.placesEast,
  ...window.placesWest
];
window.ALL_PLACES = ALL_PLACES;

// Helper functions

/**
 * Returns all places belonging to a specific state.
 * @param {string} stateId
 * @returns {Array}
 */
function getPlacesByState(stateId) {
  return ALL_PLACES.filter(p => p.stateId === stateId);
}
window.getPlacesByState = getPlacesByState;

/**
 * Returns all places belonging to a specific category.
 * @param {string} categoryId
 * @returns {Array}
 */
function getPlacesByCategory(categoryId) {
  return ALL_PLACES.filter(p => p.category === categoryId || (p.subcategories && p.subcategories.includes(categoryId)));
}
window.getPlacesByCategory = getPlacesByCategory;

/**
 * Finds a place by its unique ID.
 * @param {string} placeId
 * @returns {Object|undefined}
 */
function getPlaceById(placeId) {
  return ALL_PLACES.find(p => p.id === placeId);
}
window.getPlaceById = getPlaceById;

/**
 * Searches places by name, description, category, state, or district.
 * @param {string} query
 * @returns {Array}
 */
function searchPlaces(query) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return ALL_PLACES.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.stateId.replace(/-/g, ' ').includes(q) ||
    p.category.replace(/-/g, ' ').includes(q) ||
    p.district.toLowerCase().includes(q)
  );
}
window.searchPlaces = searchPlaces;

/**
 * Gets nearby places for a given place.
 * @param {string} placeId
 * @returns {Array}
 */
function getNearbyPlaces(placeId) {
  const place = getPlaceById(placeId);
  if (!place || !place.nearbyPlaces) return [];
  return place.nearbyPlaces.map(id => getPlaceById(id)).filter(Boolean);
}
window.getNearbyPlaces = getNearbyPlaces;

// Dynamically sync real place counts to the STATES array for exact consistency
if (window.STATES) {
  window.STATES.forEach(state => {
    state.placeCount = getPlacesByState(state.id).length;
  });
}

