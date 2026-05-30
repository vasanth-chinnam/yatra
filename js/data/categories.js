/**
 * ============================================================
 * Yatra — Travel Categories Data
 * ============================================================
 * Each category has an id (slug), display name, Lucide icon name,
 * description, and a color accent for theming.
 * ============================================================
 */

const CATEGORIES = [
  {
    id: 'heritage',
    name: 'Heritage & Culture',
    icon: 'landmark',
    description: 'UNESCO World Heritage Sites, ancient forts, palaces, and monuments that tell the story of India\'s glorious past.',
    color: 'saffron'
  },
  {
    id: 'temples',
    name: 'Temples & Spirituality',
    icon: 'church',
    description: 'Sacred temples, mosques, gurudwaras, and churches — the spiritual heartbeat of India.',
    color: 'gold'
  },
  {
    id: 'beaches',
    name: 'Beaches & Coastline',
    icon: 'waves',
    description: 'Sun-kissed shores from Goa to the Andamans — pristine sands and turquoise waters.',
    color: 'blue'
  },
  {
    id: 'hill-stations',
    name: 'Hill Stations',
    icon: 'mountain-snow',
    description: 'Cool mountain retreats in the Himalayas, Western Ghats, and Northeast — escape the heat.',
    color: 'teal'
  },
  {
    id: 'wildlife',
    name: 'Wildlife & Nature',
    icon: 'trees',
    description: 'National parks, tiger reserves, and bird sanctuaries — India\'s incredible biodiversity.',
    color: 'teal'
  },
  {
    id: 'adventure',
    name: 'Adventure & Activities',
    icon: 'compass',
    description: 'Thrilling white-water rafting, paragliding, and adrenaline-pumping experiences.',
    color: 'coral'
  },
  {
    id: 'backwaters',
    name: 'Backwaters & Lakes',
    icon: 'sailboat',
    description: 'Serene houseboats on Kerala backwaters, Dal Lake shikaras, and tranquil freshwater lagoons.',
    color: 'blue'
  },
  {
    id: 'desert',
    name: 'Desert & Dunes',
    icon: 'sun',
    description: 'The vast Thar Desert, camel safaris under starlit skies, and golden sand dunes.',
    color: 'gold'
  },
  {
    id: 'historical',
    name: 'Historical Sites',
    icon: 'scroll',
    description: 'Battlefields, ancient ruins, and archaeological wonders spanning millennia.',
    color: 'purple'
  },
  {
    id: 'pilgrimage',
    name: 'Pilgrimage',
    icon: 'heart',
    description: 'Char Dham, Varanasi, Amritsar, and sacred journeys across faiths.',
    color: 'saffron'
  },
  {
    id: 'urban',
    name: 'Urban Exploration',
    icon: 'building-2',
    description: 'Vibrant cities, street food trails, nightlife, markets, and modern India.',
    color: 'purple'
  },
  {
    id: 'islands',
    name: 'Islands',
    icon: 'palm-tree',
    description: 'Andaman & Nicobar, Lakshadweep — tropical paradises with coral reefs and emerald forests.',
    color: 'teal'
  },
  {
    id: 'religious',
    name: 'Religious & Spiritual',
    icon: 'church',
    description: 'Spiritual sanctuaries, ancient temples, shrines, and sacred pilgrimage destinations across India.',
    color: 'gold'
  },
  {
    id: 'hidden-gem',
    name: 'Hidden Gems',
    icon: 'gem',
    description: 'Secret, offbeat, and pristine destinations away from crowds — discover untouched beauty.',
    color: 'teal'
  },
  {
    id: 'trekking',
    name: 'Trekking & Hiking',
    icon: 'footprints',
    description: 'Thrilling mountain hikes, lush valley trails, and peak conquests for outdoor enthusiasts.',
    color: 'coral'
  }
];

window.CATEGORIES = CATEGORIES;

/**
 * Get a category by its slug ID.
 * @param {string} categoryId
 * @returns {Object|undefined}
 */
function getCategoryById(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId);
}
window.getCategoryById = getCategoryById;

/**
 * Get the Lucide icon name for a category.
 * @param {string} categoryId
 * @returns {string}
 */
function getCategoryIcon(categoryId) {
  const cat = getCategoryById(categoryId);
  return cat ? cat.icon : 'map-pin';
}
window.getCategoryIcon = getCategoryIcon;

/**
 * Get the accent color class for a category.
 * @param {string} categoryId
 * @returns {string}
 */
function getCategoryColor(categoryId) {
  const cat = getCategoryById(categoryId);
  return cat ? cat.color : 'saffron';
}
window.getCategoryColor = getCategoryColor;
