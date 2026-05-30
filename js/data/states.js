// ============================================================
//  Yatra — Complete Indian States & Union Territories Data
//  All 28 states + 8 union territories with real travel info,
//  Pexels imagery, categories, and visitor highlights.
// ============================================================

const STATES = [

  // ===========================
  //  STATES (28)
  // ===========================

  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    type: 'state',
    capital: 'Amaravati',
    region: 'south',
    description: 'Andhra Pradesh is a land of ancient temples, vibrant Kuchipudi dance, and the spicy Andhra cuisine that ignites the palate. From the sacred hills of Tirumala to the serene beaches of Visakhapatnam, the state offers a blend of devotion and natural beauty. The Araku Valley\'s coffee plantations and the limestone caves of Belum add adventure to any itinerary. Rich in Telugu heritage, Andhra Pradesh is where history, spirituality, and coastal charm converge.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/5667923/pexels-photo-5667923.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 18,
    topCategories: ['spiritual', 'beach', 'historical', 'adventure'],
    highlights: ['Tirumala Venkateswara Temple — world\'s most visited', 'Araku Valley — coffee & tribal culture', 'Gandikota — Grand Canyon of India']
  },

  {
    id: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    type: 'state',
    capital: 'Itanagar',
    region: 'northeast',
    description: 'Arunachal Pradesh, the "Land of the Dawn-Lit Mountains," is India\'s wildest and least explored frontier. Snow-capped peaks tower over ancient Buddhist monasteries like Tawang, the largest monastery in India. The state is home to 26 major tribes, each with distinct languages and vibrant festivals. Dense subtropical forests, roaring rivers, and the pristine Sela Pass make it a paradise for trekkers and culture seekers alike.',
    bestTime: 'March to October',
    image: 'https://images.pexels.com/photos/2815093/pexels-photo-2815093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 12,
    topCategories: ['adventure', 'spiritual', 'wildlife', 'hidden-gem'],
    highlights: ['Tawang Monastery — largest in India', 'Sela Pass — 13,700 ft Himalayan pass', 'Ziro Valley — UNESCO tentative site']
  },

  {
    id: 'assam',
    name: 'Assam',
    type: 'state',
    capital: 'Dispur',
    region: 'northeast',
    description: 'Assam is the gateway to Northeast India, renowned for its sprawling tea gardens that produce the world\'s finest malty brews. The mighty Brahmaputra River bisects the state, creating Majuli — the world\'s largest river island. Kaziranga National Park shelters two-thirds of the planet\'s one-horned rhinos. From the silk-weaving traditions of Sualkuchi to the vibrant Bihu festival, Assam pulses with a culture as rich as its fertile plains.',
    bestTime: 'October to April',
    image: 'https://images.pexels.com/photos/37116953/pexels-photo-37116953.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 14,
    topCategories: ['wildlife', 'historical', 'spiritual', 'hidden-gem'],
    highlights: ['Kaziranga NP — one-horned rhino capital', 'Majuli — world\'s largest river island', 'Kamakhya Temple — major Shakti Peetha']
  },

  {
    id: 'bihar',
    name: 'Bihar',
    type: 'state',
    capital: 'Patna',
    region: 'east',
    description: 'Bihar is the cradle of Indian civilization, where Buddhism was born under the Bodhi Tree at Bodh Gaya and the ancient university of Nalanda once drew scholars from across Asia. The ruins of Vikramshila and the Mahabodhi Temple are UNESCO treasures that whisper of a glorious intellectual past. The state\'s Chhath Puja, celebrated on the banks of the Ganges, is one of India\'s most spectacular sun-worship festivals. Bihar\'s litti-chokha cuisine and Madhubani art add earthy charm to its profound historical legacy.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/3761529/pexels-photo-3761529.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 10,
    topCategories: ['spiritual', 'historical', 'pilgrimage'],
    highlights: ['Bodh Gaya — UNESCO, where Buddha attained enlightenment', 'Nalanda — world\'s first residential university', 'Rajgir — ancient Buddhist & Jain site']
  },

  {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    type: 'state',
    capital: 'Raipur',
    region: 'central',
    description: 'Chhattisgarh is India\'s hidden heartland, blanketed in dense forests that cover over 40% of the state. The dramatic Chitrakote Falls — dubbed "India\'s Niagara" — plunges into a horseshoe gorge surrounded by sal trees. Ancient cave paintings at Kabra Pahad and the ornate temples of Bhoramdeo reveal layers of forgotten history. The Bastar region\'s tribal markets, Dhokra metalcraft, and forest honey offer one of India\'s most authentic cultural immersions.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/37074489/pexels-photo-37074489.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 10,
    topCategories: ['wildlife', 'waterfall', 'hidden-gem', 'adventure'],
    highlights: ['Chitrakote Falls — India\'s widest waterfall', 'Bastar Tribal Region — authentic tribal culture', 'Kanha National Park — Jungle Book inspiration']
  },

  {
    id: 'goa',
    name: 'Goa',
    type: 'state',
    capital: 'Panaji',
    region: 'west',
    description: 'Goa is India\'s pocket-sized paradise where golden beaches meet Portuguese-era churches and a laid-back tropical vibe. The UNESCO-listed Basilica of Bom Jesus, the vibrant night markets of Anjuna, and the spice plantations of Ponda create a mosaic of experiences. North Goa buzzes with beach shacks and electronic music, while South Goa offers tranquil shores and luxury resorts. The Goan fish curry-rice, feni spirit, and Carnival festival make every visit unforgettable.',
    bestTime: 'November to February',
    image: 'https://images.pexels.com/photos/35916755/pexels-photo-35916755.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 16,
    topCategories: ['beach', 'historical', 'food', 'adventure'],
    highlights: ['Palolem & Calangute Beaches — iconic Goa shores', 'Old Goa UNESCO Churches — Portuguese heritage', 'Dudhsagar Falls — 310m spectacular cascade']
  },

  {
    id: 'gujarat',
    name: 'Gujarat',
    type: 'state',
    capital: 'Gandhinagar',
    region: 'west',
    description: 'Gujarat is a tapestry of white salt deserts, ancient step-wells, and the last wild Asiatic lions on Earth. The Rann of Kutch transforms into a surreal white moonscape during the famed Rann Utsav festival. Somnath and Dwarka temples anchor India\'s spiritual geography, while the Statue of Unity — the world\'s tallest — towers over the Narmada. Gujarati thali cuisine, with its sweet-meets-spicy signature, and the intricate embroidery of Kutch are beloved worldwide.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/36721243/pexels-photo-36721243.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 16,
    topCategories: ['spiritual', 'wildlife', 'historical', 'hidden-gem'],
    highlights: ['Rann of Kutch — world\'s largest salt marsh', 'Gir National Park — last Asiatic lions', 'Somnath & Dwarka — Jyotirlinga & Char Dham']
  },

  {
    id: 'haryana',
    name: 'Haryana',
    type: 'state',
    capital: 'Chandigarh',
    region: 'north',
    description: 'Haryana, the land of the Mahabharata, is where the epic battle of Kurukshetra was fought millennia ago. Today this prosperous agricultural state blends ancient heritage with modern ambition — Gurugram\'s glittering skyline stands alongside the sacred Brahma Sarovar lake. Sultanpur Bird Sanctuary attracts migratory flocks from Siberia, and the Surajkund Crafts Mela is India\'s largest crafts fair. Haryanvi cuisine features rustic rotis with ghee and buttermilk that fuel its legendary wrestling culture.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/3123991/pexels-photo-3123991.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 8,
    topCategories: ['historical', 'wildlife', 'spiritual'],
    highlights: ['Kurukshetra — Mahabharata battlefield', 'Sultanpur Bird Sanctuary — Ramsar wetland', 'Morni Hills — Haryana\'s only hill station']
  },

  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    type: 'state',
    capital: 'Shimla',
    region: 'north',
    description: 'Himachal Pradesh is the crown jewel of India\'s Himalayan states, where colonial hill stations, ancient temples, and snow-dusted peaks create an irresistible allure. Shimla\'s Ridge, Manali\'s Rohtang Pass, and the serene Spiti Valley offer adventures from gentle strolls to extreme treks. Dharamshala — home of the Dalai Lama — infuses Tibetan culture into the mountain air. Apple orchards, deodar forests, and the steaming momos of McLeodGanj make Himachal a year-round escape.',
    bestTime: 'March to June, September to November',
    image: 'https://images.pexels.com/photos/32702512/pexels-photo-32702512.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 16,
    topCategories: ['hill-station', 'adventure', 'spiritual', 'hidden-gem'],
    highlights: ['Spiti Valley — cold desert at 12,500 ft', 'Dharamshala — home of the Dalai Lama', 'Bir Billing — world\'s best paragliding']
  },

  {
    id: 'jharkhand',
    name: 'Jharkhand',
    type: 'state',
    capital: 'Ranchi',
    region: 'east',
    description: 'Jharkhand, carved from Bihar in 2000, is a treasure trove of waterfalls, forests, and tribal heritage nestled on the Chota Nagpur Plateau. Hundru Falls plunges 98 metres into a rocky pool, while Betla National Park shelters wild elephants and tigers in dense sal forests. The state\'s Santhali and Mundari tribes maintain ancient traditions of music, dance, and Sohrai art painted on mud walls. Jharkhand\'s mineral wealth earned it the title "Ruhr of India," and its Dhuska street snacks are a local delight.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/12601505/pexels-photo-12601505.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 10,
    topCategories: ['waterfall', 'wildlife', 'spiritual', 'adventure'],
    highlights: ['Vaidyanath Jyotirlinga — Deoghar pilgrimage', 'Hundru & Dasam Falls — stunning cascades', 'Netarhat — Queen of Chhota Nagpur']
  },

  {
    id: 'karnataka',
    name: 'Karnataka',
    type: 'state',
    capital: 'Bengaluru',
    region: 'south',
    description: 'Karnataka is a state of astonishing contrasts — the tech hub of Bengaluru, the royal grandeur of Mysore Palace, and the ancient ruins of Hampi all coexist within its borders. The Western Ghats harbour Coorg\'s misty coffee estates, Jog Falls (India\'s second-highest plunge waterfall), and the lush forests of Nagarhole. Karnataka\'s Hoysala temples at Belur and Halebidu are sculptural masterpieces, while its Bisi Bele Bath, Mysore Pak, and filter coffee are culinary icons of South India.',
    bestTime: 'October to February',
    image: 'https://images.pexels.com/photos/18411177/pexels-photo-18411177.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 20,
    topCategories: ['historical', 'wildlife', 'beach', 'hill-station'],
    highlights: ['Hampi — UNESCO Vijayanagara ruins', 'Coorg — Scotland of India', 'Chamundeshwari — major Shakti Peetha']
  },

  {
    id: 'kerala',
    name: 'Kerala',
    type: 'state',
    capital: 'Thiruvananthapuram',
    region: 'south',
    description: 'Kerala, "God\'s Own Country," is a tropical masterpiece of emerald backwaters, coconut-fringed beaches, and misty hill stations. A houseboat cruise through Alleppey\'s backwaters is one of India\'s most iconic travel experiences. Munnar\'s rolling tea gardens, Periyar\'s tiger reserve, and the Kathakali dance performances of Kochi immerse you in nature and tradition. The state\'s Ayurvedic wellness retreats, Malabar biryani, and toddy-shop culture make it an unmissable destination.',
    bestTime: 'September to March',
    image: 'https://images.pexels.com/photos/15475604/pexels-photo-15475604.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 18,
    topCategories: ['beach', 'hill-station', 'wildlife', 'spiritual'],
    highlights: ['Alleppey Backwaters — houseboat paradise', 'Padmanabhaswamy Temple — world\'s richest temple', 'Munnar — rolling tea estate hills']
  },

  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    type: 'state',
    capital: 'Bhopal',
    region: 'central',
    description: 'Madhya Pradesh, the "Heart of India," is the country\'s wildlife capital with more tiger reserves than any other state. Kanha and Bandhavgarh national parks inspired Rudyard Kipling\'s Jungle Book. The UNESCO-listed temples of Khajuraho, Sanchi Stupa, and Bhimbetka rock shelters trace India\'s artistic story from prehistoric to medieval eras. Bhopal\'s lakes, Orchha\'s cenotaphs, and the street food of Indore — recently crowned India\'s cleanest city — add depth to every visit.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/13129901/pexels-photo-13129901.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 18,
    topCategories: ['wildlife', 'historical', 'spiritual', 'hidden-gem'],
    highlights: ['Bandhavgarh & Kanha — India\'s tiger heartland', 'Khajuraho — UNESCO temple sculptures', 'Mahakaleshwar & Omkareshwar — 2 Jyotirlingas']
  },

  {
    id: 'maharashtra',
    name: 'Maharashtra',
    type: 'state',
    capital: 'Mumbai',
    region: 'west',
    description: 'Maharashtra is a powerhouse of culture, commerce, and natural beauty anchored by Mumbai — India\'s city of dreams. The rock-cut caves of Ajanta and Ellora are UNESCO masterpieces spanning Buddhist, Hindu, and Jain art. The Western Ghats gift the state with hill stations like Lonavala and Mahabaleshwar, while the Konkan coastline hides pristine beaches. From the Marathi theatre tradition and Lavani dance to the iconic vada pav and Kolhapuri misal, Maharashtra pulsates with creative energy.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/31443754/pexels-photo-31443754.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 18,
    topCategories: ['historical', 'beach', 'hill-station', 'spiritual'],
    highlights: ['Ajanta & Ellora Caves — UNESCO masterpieces', 'Ashta Vinayaka — 8 Ganesha temple circuit', '3 Jyotirlingas — Bhimashankar, Trimbakeshwar, Grishneshwar']
  },

  {
    id: 'manipur',
    name: 'Manipur',
    type: 'state',
    capital: 'Imphal',
    region: 'northeast',
    description: 'Manipur, the "Jeweled Land," enchants with Loktak Lake — the world\'s only floating lake with circular phumdis (floating islands) that dot its surface. The Keibul Lamjao National Park on the lake is the last natural habitat of the endangered Sangai deer. Manipur is the birthplace of modern polo and the fierce martial art of Thang-Ta. The Ima Keithel in Imphal — Asia\'s largest all-women market — and the Shirui Lily hills make this state one of India\'s most unique destinations.',
    bestTime: 'March to June, September to November',
    image: 'https://images.pexels.com/photos/34293087/pexels-photo-34293087.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 8,
    topCategories: ['hidden-gem', 'wildlife', 'adventure', 'historical'],
    highlights: ['Loktak Lake — world\'s only floating national park', 'Dzuko Valley — NE Valley of Flowers', 'WWII Imphal War Cemetery — moving memorial']
  },

  {
    id: 'meghalaya',
    name: 'Meghalaya',
    type: 'state',
    capital: 'Shillong',
    region: 'northeast',
    description: 'Meghalaya, the "Abode of Clouds," is where the wettest place on Earth meets living root bridges woven by Khasi tribes over centuries. Cherrapunji and Mawsynram receive the world\'s highest rainfall, nurturing dramatic waterfalls and deep limestone caves. The crystal-clear Dawki River on the Bangladesh border creates an illusion of boats floating on air. Shillong\'s colonial charm, vibrant music scene, and Khasi tribal cuisine of jadoh (pork rice) make Meghalaya a dreamscape of mist and wonder.',
    bestTime: 'September to May',
    image: 'https://images.pexels.com/photos/18876314/pexels-photo-18876314.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 10,
    topCategories: ['adventure', 'hidden-gem', 'waterfall', 'hill-station'],
    highlights: ['Living Root Bridges — Nongriat double-decker', 'Dawki Crystal River — boats floating on glass', 'Nohkalikai Falls — India\'s tallest plunge at 340m']
  },

  {
    id: 'mizoram',
    name: 'Mizoram',
    type: 'state',
    capital: 'Aizawl',
    region: 'northeast',
    description: 'Mizoram, the "Land of the Highlanders," is an emerald tapestry of rolling blue hills, bamboo forests, and one of India\'s highest literacy rates. The Mizo people are celebrated for their warm hospitality, colourful Cheraw (bamboo) dance, and the community-driven Tlawmngaihna spirit. Phawngpui (Blue Mountain), the state\'s highest peak, offers panoramic views of Myanmar. The Tam Dil lake, Vantawng Falls, and the handloom markets of Aizawl make Mizoram a peaceful, unspoiled retreat.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/18006896/pexels-photo-18006896.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 6,
    topCategories: ['hidden-gem', 'hill-station', 'adventure'],
    highlights: ['Phawngpui Blue Mountain — highest peak', 'Vantawng Falls — tallest waterfall at 229m', 'Aizawl — one of India\'s safest cities']
  },

  {
    id: 'nagaland',
    name: 'Nagaland',
    type: 'state',
    capital: 'Kohima',
    region: 'northeast',
    description: 'Nagaland, the "Land of Festivals," is a mountainous realm of 16 major warrior tribes, each with their own vibrant customs and stunning traditional attire. The Hornbill Festival in December transforms Kohima into a spectacular showcase of Naga culture, music, and cuisine. Dzükou Valley, with its rolling carpet of wildflowers, is one of India\'s finest treks. Nagaland\'s smoked pork delicacies, head-hunting history, and WWII battle sites at Kohima War Cemetery offer a travel experience unlike any other in India.',
    bestTime: 'October to May',
    image: 'https://images.pexels.com/photos/34330917/pexels-photo-34330917.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 8,
    topCategories: ['hidden-gem', 'adventure', 'historical', 'food'],
    highlights: ['Hornbill Festival — Festival of Festivals (Dec 1–10)', 'Kohima War Cemetery — WWII Stalingrad of the East', 'Mon — Konyak Naga head-hunter villages']
  },

  {
    id: 'odisha',
    name: 'Odisha',
    type: 'state',
    capital: 'Bhubaneswar',
    region: 'east',
    description: 'Odisha is a treasure trove of temple architecture, where the Konark Sun Temple\'s stone chariot wheels and Jagannath Temple\'s towering spire define India\'s eastern skyline. The Rath Yatra of Puri draws millions as massive chariots roll through ancient streets. Chilika Lake — Asia\'s largest brackish water lagoon — hosts Irrawaddy dolphins and flamingoes. The state\'s Pattachitra paintings, Sambalpuri ikat textiles, and the sublime dalma (lentil-vegetable stew) round out a deeply cultural journey.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/37121962/pexels-photo-37121962.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 12,
    topCategories: ['historical', 'spiritual', 'wildlife', 'hidden-gem'],
    highlights: ['Konark Sun Temple — UNESCO stone chariot', 'Jagannath Temple Puri — Eastern Char Dham', 'Chilika Lake — Irrawaddy dolphins & flamingoes']
  },

  {
    id: 'punjab',
    name: 'Punjab',
    type: 'state',
    capital: 'Chandigarh',
    region: 'north',
    description: 'Punjab is the land of five rivers, golden wheat fields, and the magnificent Golden Temple of Amritsar that glows like a jewel at dawn. The Wagah Border ceremony delivers a thunderous display of patriotic pageantry every sunset. Punjab\'s vibrant Bhangra music, Lohri bonfires, and the epic langar (community kitchen) tradition at Sikh gurdwaras embody its generous spirit. From butter chicken and makki di roti to Phulkari embroidery, Punjab is India\'s heartland of abundance and warmth.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/31617840/pexels-photo-31617840.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 8,
    topCategories: ['spiritual', 'historical', 'food'],
    highlights: ['Golden Temple — holiest Sikh shrine, 24/7 langar', 'Wagah Border — electrifying sunset ceremony', 'Anandpur Sahib — birthplace of Khalsa']
  },

  {
    id: 'rajasthan',
    name: 'Rajasthan',
    type: 'state',
    capital: 'Jaipur',
    region: 'west',
    description: 'Rajasthan is India\'s royal heartland, a desert canvas splashed with the pink facades of Jaipur, the blue houses of Jodhpur, and the golden sandstone of Jaisalmer. Majestic forts like Amber, Mehrangarh, and Chittorgarh narrate tales of Rajput valor across centuries. The Thar Desert offers camel safaris under star-lit skies, while Udaipur\'s Lake Pichola mirrors palatial splendor. Rajasthani dal-baati-churma, vibrant textiles, and the Pushkar Camel Fair make every moment a royal affair.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/36470626/pexels-photo-36470626.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 20,
    topCategories: ['historical', 'wildlife', 'spiritual', 'food'],
    highlights: ['Jaisalmer Fort & Sam Sand Dunes — Thar Desert', 'Ranthambore — India\'s most famous tiger reserve', 'Udaipur — City of Lakes']
  },

  {
    id: 'sikkim',
    name: 'Sikkim',
    type: 'state',
    capital: 'Gangtok',
    region: 'northeast',
    description: 'Sikkim is a Himalayan gem where the mighty Kanchenjunga — the world\'s third-highest peak — watches over a land of Buddhist monasteries, rhododendron forests, and emerald lakes. The Tsomgo Lake reflects snowcapped peaks at 12,400 ft, while Rumtek and Pemayangtse monasteries preserve centuries of Tibetan Buddhist heritage. India\'s first fully organic state, Sikkim dazzles with prayer-flag-draped trails, steaming momos, and the alpine charm of Gangtok. It\'s compact, clean, and breathtakingly beautiful.',
    bestTime: 'March to May, October to December',
    image: 'https://images.pexels.com/photos/36730364/pexels-photo-36730364.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 10,
    topCategories: ['hill-station', 'adventure', 'spiritual', 'hidden-gem'],
    highlights: ['Gurudongmar Lake — one of world\'s highest at 17,800 ft', 'Zuluk Old Silk Route — 32 hairpin bends', 'Pelling — finest Kanchenjunga views']
  },

  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    type: 'state',
    capital: 'Chennai',
    region: 'south',
    description: 'Tamil Nadu is the custodian of the world\'s oldest living classical culture, with Dravidian temples that soar in kaleidoscopic gopurams across the landscape. The Meenakshi Amman Temple in Madurai, the shore temples of Mahabalipuram, and the Brihadeeswara Temple in Thanjavur are architectural wonders spanning millennia. The Nilgiri hill stations of Ooty and Kodaikanal provide cool retreats, while Chettinad\'s fiery cuisine and Marina Beach\'s sunrise walks complete the Tamil experience.',
    bestTime: 'November to February',
    image: 'https://images.pexels.com/photos/14422593/pexels-photo-14422593.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 26,
    topCategories: ['spiritual', 'historical', 'beach', 'hill-station'],
    highlights: ['Meenakshi Amman — 14 towering gopurams in Madurai', 'Ramanathaswamy Rameswaram — Jyotirlinga & Char Dham', 'Nava Graha & Arupadai Veedu — complete pilgrimage circuits']
  },

  {
    id: 'telangana',
    name: 'Telangana',
    type: 'state',
    capital: 'Hyderabad',
    region: 'south',
    description: 'Telangana is the land of the Nizams, where the regal Charminar stands sentinel over Hyderabad\'s legendary old city. The Golconda Fort whispers tales of Kohinoor diamonds, while Hussain Sagar lake reflects the city\'s modern skyline. Hyderabadi biryani — fragrant with saffron and slow-cooked dum — is revered as India\'s finest rice dish. Beyond the capital, the Kakatiya temples of Warangal and the tiger-prowled forests of Amrabad offer history and nature in equal measure.',
    bestTime: 'October to February',
    image: 'https://images.pexels.com/photos/31291393/pexels-photo-31291393.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 18,
    topCategories: ['historical', 'food', 'spiritual', 'hidden-gem'],
    highlights: ['Charminar & Golconda Fort — Nizam heritage', 'Ramappa Temple — UNESCO Kakatiya masterpiece', 'Jogulamba Shakti Peetha — Alampur']
  },

  {
    id: 'tripura',
    name: 'Tripura',
    type: 'state',
    capital: 'Agartala',
    region: 'northeast',
    description: 'Tripura, the smallest state in the northeast, hides grand surprises — the Neermahal water palace rises from Rudrasagar Lake like a Mughal dream floating on water. The Ujjayanta Palace in Agartala blends Indo-Saracenic grandeur with a state museum, while Unakoti\'s mysterious 7th-century rock carvings of Shiva remain one of India\'s least-known archaeological marvels. Tripura\'s bamboo handicrafts, Riang tribal dances, and the sweet berma (fermented fish) cuisine offer an intimate cultural detour.',
    bestTime: 'September to February',
    image: 'https://images.pexels.com/photos/31627103/pexels-photo-31627103.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 6,
    topCategories: ['historical', 'hidden-gem', 'hill-station'],
    highlights: ['Neermahal Water Palace — palace in middle of a lake', 'Unakoti Rock Sculptures — 9th-century Shiva carvings', 'Jampui Hills — Orange Festival in November']
  },

  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    type: 'state',
    capital: 'Lucknow',
    region: 'north',
    description: 'Uttar Pradesh is home to the Taj Mahal — the world\'s greatest monument to love — and the sacred Ganges ghats of Varanasi, India\'s oldest living city. From the Buddhist pilgrimage site of Sarnath to the Mughal majesty of Fatehpur Sikri, the state is an open-air museum of civilization. Lucknow\'s Nawabi cuisine of kebabs and biryanis is legendary, while the Kumbh Mela at Prayagraj draws the largest human gathering on Earth. UP is where India\'s spiritual soul lives and breathes.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/15164332/pexels-photo-15164332.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 16,
    topCategories: ['historical', 'spiritual', 'food', 'pilgrimage'],
    highlights: ['Taj Mahal Agra — Seven Wonders of the World', 'Varanasi Ghats — world\'s oldest living city', 'Kashi Vishwanath — 7th Jyotirlinga & Sapta Puri']
  },

  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    type: 'state',
    capital: 'Dehradun',
    region: 'north',
    description: 'Uttarakhand, the "Land of the Gods," is where the sacred Ganges and Yamuna rivers are born from Himalayan glaciers. The Char Dham pilgrimage circuit (Badrinath, Kedarnath, Gangotri, Yamunotri) draws millions of devotees annually. Rishikesh — the yoga capital of the world — perches above the turquoise Ganges, while Jim Corbett National Park was India\'s first tiger reserve. The Valley of Flowers, a UNESCO site, blooms with 600+ species of alpine wildflowers each monsoon season.',
    bestTime: 'March to June, September to November',
    image: 'https://images.pexels.com/photos/14149541/pexels-photo-14149541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 22,
    topCategories: ['spiritual', 'adventure', 'wildlife', 'hill-station'],
    highlights: ['Kedarnath & Badrinath — Jyotirlinga & Char Dham', 'Panch Kedar & Panch Badri — full Himalayan circuits', 'Valley of Flowers — UNESCO alpine wildflower meadow']
  },

  {
    id: 'west-bengal',
    name: 'West Bengal',
    type: 'state',
    capital: 'Kolkata',
    region: 'east',
    description: 'West Bengal is a cultural colossus — Kolkata\'s colonial Raj-era architecture, the Durga Puja festival (UNESCO Intangible Heritage), and Rabindranath Tagore\'s Shantiniketan create an intellectual and artistic epicenter. The Sundarbans mangrove delta shelters the Royal Bengal Tiger in the world\'s largest tidal forest. Darjeeling\'s toy train chugs past emerald tea gardens with Kanchenjunga as a backdrop. Bengali sweets like rasgulla and sandesh, and the state\'s fish-centric cuisine, are national treasures.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/33814799/pexels-photo-33814799.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 14,
    topCategories: ['historical', 'wildlife', 'hill-station', 'food'],
    highlights: ['Darjeeling — UNESCO toy train & tea gardens', 'Sundarbans — Royal Bengal Tiger mangrove delta', 'Kalighat Kali Temple — major Shakti Peetha']
  },

  // ===========================
  //  UNION TERRITORIES (8)
  // ===========================

  {
    id: 'andaman-nicobar',
    name: 'Andaman & Nicobar Islands',
    type: 'union-territory',
    capital: 'Port Blair',
    region: 'islands',
    description: 'The Andaman & Nicobar Islands are an archipelago of 572 pristine islands floating in the turquoise waters of the Bay of Bengal. Radhanagar Beach on Havelock Island has been repeatedly voted Asia\'s best beach, while the coral reefs of Neil Island offer world-class snorkeling. The Cellular Jail in Port Blair — the "Kala Pani" — stands as a poignant memorial to India\'s freedom struggle. With bioluminescent beaches, mangrove kayaking, and indigenous Jarawa tribe forests, this is India\'s tropical Eden.',
    bestTime: 'October to May',
    image: 'https://images.pexels.com/photos/14313849/pexels-photo-14313849.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 8,
    topCategories: ['beach', 'adventure', 'historical', 'hidden-gem'],
    highlights: ['Radhanagar Beach — Asia\'s best beach on Havelock', 'Cellular Jail — Kala Pani freedom fighters\' prison', 'Havelock Island — India\'s best scuba diving']
  },

  {
    id: 'chandigarh',
    name: 'Chandigarh',
    type: 'union-territory',
    capital: 'Chandigarh',
    region: 'north',
    description: 'Chandigarh is India\'s first planned city, designed by the legendary architect Le Corbusier with geometric precision and abundant green spaces. The Rock Garden — built entirely from industrial and household waste by Nek Chand — is a folk-art wonderland of mosaic sculptures. Sukhna Lake offers tranquil rowing at the Shivalik foothills, while the Capitol Complex is a UNESCO World Heritage site showcasing modernist architecture. India\'s cleanest city, Chandigarh combines urban efficiency with the laid-back charm of its food streets.',
    bestTime: 'September to March',
    image: 'https://images.pexels.com/photos/20488884/pexels-photo-20488884.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 6,
    topCategories: ['historical', 'food', 'famous'],
    highlights: ['Rock Garden — 40-acre sculptures from urban waste', 'Capitol Complex — UNESCO Le Corbusier masterpiece', 'Sukhna Lake — tranquil Shivalik foothills lake']
  },

  {
    id: 'dadra-nagar-haveli-daman-diu',
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    type: 'union-territory',
    capital: 'Daman',
    region: 'west',
    description: 'This merged union territory combines the forested tribal lands of Dadra & Nagar Haveli with the coastal Portuguese heritage of Daman & Diu. Diu\'s 16th-century Portuguese fort overlooks pristine Arabian Sea beaches, while the Basilica of Bom Jesus echoes Goa\'s colonial past on a quieter stage. Silvassa\'s Vanganga Lake Garden and tribal museums offer a peaceful inland retreat. Known for affordable beach getaways and duty-free liquor, this territory is a hidden gem on India\'s western coast.',
    bestTime: 'October to May',
    image: 'https://images.pexels.com/photos/15921672/pexels-photo-15921672.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 6,
    topCategories: ['beach', 'historical', 'hidden-gem'],
    highlights: ['Diu Fort — 16th-century Portuguese seaside fort', 'Nagoa Beach Diu — pristine and uncrowded', 'Silvassa Tribal Museum — authentic tribal heritage']
  },

  {
    id: 'delhi',
    name: 'Delhi',
    type: 'union-territory',
    capital: 'New Delhi',
    region: 'north',
    description: 'Delhi is India\'s monumental capital, a city where Mughal splendor, British colonial grandeur, and ultramodern ambition coexist on every street. The Red Fort, Humayun\'s Tomb, and Qutub Minar are UNESCO landmarks that chart centuries of empire. Chandni Chowk\'s chaotic food lanes serve the best paranthas, jalebis, and chole bhature in the country. From the tranquil Lodhi Gardens to the vibrant Hauz Khas Village art scene, Delhi is a sensory overload that rewards the curious traveler.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/16960242/pexels-photo-16960242.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 14,
    topCategories: ['historical', 'food', 'spiritual', 'famous'],
    highlights: ['Red Fort, Qutub Minar, Humayun\'s Tomb — 3 UNESCO sites', 'Chandni Chowk — India\'s greatest street food lane', 'Akshardham Temple — massive Swaminarayan complex']
  },

  {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    type: 'union-territory',
    capital: 'Srinagar',
    region: 'north',
    description: 'Jammu & Kashmir is "Paradise on Earth" — a land of shimmering Dal Lake shikaras, terraced saffron fields, and Mughal gardens that bloom with chinar trees in autumn gold. Gulmarg\'s pristine ski slopes are Asia\'s finest, while Pahalgam\'s pine-forested trails lead to the sacred Amarnath Cave. The Kashmir Valley\'s pashmina shawls, walnut-wood carvings, and the Wazwan feast of 36 courses are expressions of a deeply refined artistic culture. From the temples of Jammu to the meadows of Sonmarg, this territory is endlessly enchanting.',
    bestTime: 'March to October',
    image: 'https://images.pexels.com/photos/25786565/pexels-photo-25786565.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 14,
    topCategories: ['hill-station', 'adventure', 'spiritual', 'hidden-gem'],
    highlights: ['Dal Lake Srinagar — houseboat & shikara rides', 'Gulmarg — Asia\'s finest ski resort', 'Vaishno Devi — 15th Shakti Peetha, 8M pilgrims/year']
  },

  {
    id: 'ladakh',
    name: 'Ladakh',
    type: 'union-territory',
    capital: 'Leh',
    region: 'north',
    description: 'Ladakh is the "Land of High Passes" — a stark, otherworldly moonscape of barren mountains, turquoise lakes, and ancient Buddhist monasteries perched on clifftops. Pangong Tso lake shifts through five shades of blue across the day, while Nubra Valley\'s sand dunes host Bactrian camels. The Khardung La pass at 17,982 ft is among the world\'s highest motorable roads. Ladakh\'s gompas (monasteries), thukpa soups, and the Hemis Festival immerse visitors in a living Tibetan Buddhist culture against the most dramatic Himalayan backdrops.',
    bestTime: 'May to September',
    image: 'https://images.pexels.com/photos/17033848/pexels-photo-17033848.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 10,
    topCategories: ['adventure', 'spiritual', 'hill-station', 'hidden-gem'],
    highlights: ['Pangong Tso — crystal blue lake at 4,350m', 'Nubra Valley — Bactrian camels & Khardung La', 'Tso Moriri — remote high-altitude lake with cranes']
  },

  {
    id: 'lakshadweep',
    name: 'Lakshadweep',
    type: 'union-territory',
    capital: 'Kavaratti',
    region: 'islands',
    description: 'Lakshadweep is India\'s smallest union territory — a constellation of 36 coral islands scattered across the Arabian Sea like emeralds on sapphire silk. Agatti Island\'s turquoise lagoon, Bangaram\'s uninhabited beach paradise, and Minicoy\'s towering lighthouse offer a Maldives-like experience at Indian prices. The coral reefs here are among the healthiest in the Indian Ocean, perfect for scuba diving and snorkeling. With strict visitor permits preserving its pristine beauty, Lakshadweep remains India\'s most exclusive tropical escape.',
    bestTime: 'October to May',
    image: 'https://images.pexels.com/photos/6189571/pexels-photo-6189571.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 4,
    topCategories: ['beach', 'adventure', 'hidden-gem'],
    highlights: ['Agatti & Bangaram Islands — pristine coral lagoons', 'World-class scuba diving on healthy coral reefs', 'Kavaratti — India\'s most exclusive tropical getaway']
  },

  {
    id: 'puducherry',
    name: 'Puducherry',
    type: 'union-territory',
    capital: 'Puducherry',
    region: 'south',
    description: 'Puducherry (formerly Pondicherry) is a sun-kissed Franco-Tamil enclave where pastel-hued French colonial villas line bougainvillea-draped streets. The Promenade Beach esplanade, Sri Aurobindo Ashram, and the experimental township of Auroville — with its gleaming Matrimandir golden sphere — attract seekers and wanderers alike. The French Quarter\'s cafés serve croissants alongside filter coffee, while the Tamil Quarter buzzes with colorful markets. Puducherry\'s bouillabaisse-meets-rasam cuisine is a delicious metaphor for its East-meets-West soul.',
    bestTime: 'October to March',
    image: 'https://images.pexels.com/photos/37266542/pexels-photo-37266542.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    placeCount: 6,
    topCategories: ['beach', 'historical', 'spiritual', 'food'],
    highlights: ['French Quarter White Town — colonial villa heritage walk', 'Auroville Matrimandir — universal meditation dome', 'Paradise Beach — accessible only by boat']
  }

];