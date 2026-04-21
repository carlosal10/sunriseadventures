export type TourAvailability = {
  date: string;
  status: string;
};

export type TourTestimonial = {
  name?: string;
  image?: string;
  text: string;
};

export type TourRecord = {
  id: string;
  slug: string;
  title: string;
  short: string;
  summary: string;
  description: string;
  heroImage: string;
  gallery: string[];
  dateLabel: string;
  location: string;
  priceLabel: string;
  priceValue: number;
  mapEmbed: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  availability: TourAvailability[];
  testimonials: TourTestimonial[];
  isFeatured: boolean;
  isPublished: boolean;
  featuredOrder: number;
  whatsappNumber: string;
};

const WHATSAPP_NUMBER = '254118706567';

const TOURS: TourRecord[] = [
  {
    id: 'lalanasi-lodge-trip',
    slug: 'lalanasi-lodge-trip',
    title: 'Lalanasi Lodge Trip',
    short: 'A lodge escape with scenic views, team activities, and Thomson\'s Falls.',
    summary:
      'Spend a day at Lalanasi with outdoor activities, team bonding, a lodge experience, and a trip to Thomson\'s Falls.',
    description:
      'Take a break from the city with our Lalanasi Lodge Trip, a relaxed outdoor experience combining scenic views, fun activities, lodge time, and a visit to Thomson\'s Falls. It is a great option for friends, groups, and travelers who want a refreshing day out.',
    heroImage: '/images/lalanasi/1.jpg',
    gallery: [
      '/images/lalanasi/1.jpg',
      '/images/lalanasi/2.jpg',
      '/images/lalanasi/3.jpg',
      '/images/lalanasi/4.jpg',
      '/images/lalanasi/5.jpg',
      '/images/lalanasi/6.jpg',
    ],
    dateLabel: '4 May 2026',
    location: 'Lalanasi Lodge and Thomson\'s Falls',
    priceLabel: 'From KES 4,000',
    priceValue: 4000,
    mapEmbed: 'https://www.google.com/maps?q=Thomsons%20Falls%20Nyahururu&output=embed',
    highlights: [
      'Transport to and from the venue',
      'Photography',
      'Team building',
      'Scenic hike',
      'Quad bike experience',
      'Swimming',
      'Thomson\'s Falls visit',
      'Lunch',
      'Farm tour',
    ],
    includes: ['Return transport', 'Lunch', 'Professional guide', 'Entry fees'],
    excludes: ['Personal expenses'],
    availability: [{ date: '4 May 2026', status: 'Available' }],
    testimonials: [
      {
        name: 'Owuor Timon',
        text: 'Peaceful, fun, refreshing, and very well organized.',
      },
    ],
    isFeatured: true,
    isPublished: true,
    featuredOrder: 2,
    whatsappNumber: WHATSAPP_NUMBER,
  },
  {
    id: 'tigoni-experience',
    slug: 'tigoni-experience',
    title: 'Tigoni Experience',
    short: 'A countryside reset with farm views, walks, and easy adventure.',
    summary:
      'Escape the city for a one-day countryside experience filled with scenic walks, fresh air, and relaxed outdoor fun.',
    description:
      'Escape the city and immerse yourself in a refreshing countryside experience with our Tigoni Farm Adventure. This one-day trip blends nature, relaxation, light adventure, and scenic landscapes for individuals, friends, and groups looking to unwind and explore.',
    heroImage: '/images/tigoni/1.jpg',
    gallery: [
      '/images/tigoni/1.jpg',
      '/images/tigoni/2.jpg',
      '/images/tigoni/3.jpg',
      '/images/tigoni/4.jpg',
    ],
    dateLabel: '24 Jan 2026',
    location: 'Tigoni, Limuru',
    priceLabel: 'From KES 2,800',
    priceValue: 2800,
    mapEmbed: 'https://www.google.com/maps?q=Tigoni%20Limuru&output=embed',
    highlights: [
      'Comfortable transport in a safari van',
      'Farm entrance fees',
      'Guided farm tour',
      'Scenic hike',
      'Nature walk around the farm',
      'Picnic experience',
      'Waterfall chase',
      'Access to basketball court',
      'Lawn tennis',
      'Fresh fruits',
      'Relaxation and photo moments',
      'Group bonding experience',
    ],
    includes: ['Return transport', 'Professional guide', 'Entry fees', 'Fresh fruits'],
    excludes: ['Meals', 'Personal expenses'],
    availability: [{ date: '24 Jan 2026', status: 'Available' }],
    testimonials: [
      {
        name: 'Alice W.',
        text: 'Peaceful, refreshing, and very well organized from start to finish.',
      },
    ],
    isFeatured: true,
    isPublished: true,
    featuredOrder: 1,
    whatsappNumber: WHATSAPP_NUMBER,
  },
  {
    id: 'valentines-sironka-resort',
    slug: 'valentines-sironka-resort',
    title: "Valentine's Edition - Sironka Resort",
    short: 'A romantic day out with resort views, activities, and shared moments.',
    summary:
      "Celebrate Valentine's weekend with a scenic resort escape built for couples, friends, and anyone chasing good energy outdoors.",
    description:
      "Celebrate love, friendship, and adventure this Valentine's Day with an unforgettable experience at Sironka Resort. Surrounded by beautiful landscapes and fun-filled activities, this special edition is perfect for couples, friends, and anyone looking to enjoy a vibrant outdoor getaway.",
    heroImage: '/images/tour-mountain.jpg',
    gallery: [
      '/images/tour-mountain.jpg',
      '/images/hero-mini.jpg',
      '/images/hero-mountain.jpg',
    ],
    dateLabel: '14 Feb 2026',
    location: 'Sironka Resort',
    priceLabel: 'From KES 3,800',
    priceValue: 3800,
    mapEmbed: 'https://www.google.com/maps?q=Sironka%20Resort&output=embed',
    highlights: [
      'Transport to and from the resort',
      'Welcome drink on arrival',
      'Resort access and activity fees',
      'Team-building activities',
      'Zip line experience',
      'Lunch',
      'Games on board',
      'Professional photography',
      'Dance session',
      'Drinking water',
    ],
    includes: ['Return transport', 'Activity access', 'Lunch', 'Photography'],
    excludes: ['Extra snacks', 'Personal expenses'],
    availability: [{ date: '14 Feb 2026', status: 'Available' }],
    testimonials: [
      {
        name: 'Brian and Mercy',
        text: 'It struck the perfect balance between adventure, fun, and time to slow down together.',
      },
    ],
    isFeatured: true,
    isPublished: true,
    featuredOrder: 3,
    whatsappNumber: WHATSAPP_NUMBER,
  },
  {
    id: 'nyamindi-hike',
    slug: 'nyamindi-hike',
    title: 'Nyamindi Hike',
    short: 'Forest trails, waterfalls, and a refreshing day in nature.',
    summary:
      'Explore the lush Kathandeni Forest on a guided hike to Nyamindi Falls, ideal for hikers and nature lovers.',
    description:
      'Join us for an exciting nature escape to Nyamindi Falls, hidden deep within the lush Kathandeni Forest. This guided hike is perfect for nature lovers, hikers, and adventure seekers looking to explore scenic forest trails and a beautiful waterfall in a peaceful natural setting.',
    heroImage: '/images/nyamindi/1.jpg',
    gallery: [
      '/images/nyamindi/1.jpg',
      '/images/nyamindi/2.jpg',
      '/images/tour-safari.jpg',
    ],
    dateLabel: '28 Feb 2026',
    location: 'Kathandeni Forest - Nyamindi Falls',
    priceLabel: 'From KES 2,850',
    priceValue: 2850,
    mapEmbed: 'https://www.google.com/maps?q=Nyamindi%20Falls&output=embed',
    highlights: [
      'Guided hike to Nyamindi Falls',
      'Transport to and from the hiking point',
      'Forest entrance fees',
      'Energizers and fresh fruits',
      'Professional ranger or forest guide',
      'Photography',
    ],
    includes: ['Return transport', 'Professional guide', 'Entry fees', 'Energizers'],
    excludes: ['Meals', 'Personal expenses'],
    availability: [{ date: '28 Feb 2026', status: 'Available' }],
    testimonials: [],
    isFeatured: true,
    isPublished: true,
    featuredOrder: 4,
    whatsappNumber: WHATSAPP_NUMBER,
  },
  {
    id: 'satima-hike',
    slug: 'satima-hike',
    title: 'Satima Hike',
    short: 'A high-altitude challenge with sweeping Aberdare views.',
    summary:
      'Push your limits on a guided climb to Satima Peak, the highest point in the Aberdare Range.',
    description:
      'Challenge yourself with an unforgettable hiking experience to Satima Peak, the highest point in the Aberdare Range and one of Kenya\'s most scenic alpine destinations. This hike is ideal for adventure seekers who want open moorlands, panoramic views, and a rewarding summit day.',
    heroImage: '/images/satima/1.jpg',
    gallery: [
      '/images/satima/1.jpg',
      '/images/satima/2.jpg',
      '/images/satima/3.jpg',
    ],
    dateLabel: '7 Mar 2026',
    location: 'Aberdare Range - Satima Peak',
    priceLabel: 'From KES 3,800',
    priceValue: 3800,
    mapEmbed: 'https://www.google.com/maps?q=Satima%20Peak&output=embed',
    highlights: [
      'Guided hike to Satima Peak',
      'Transport to and from the hiking point',
      'Park entry fees',
      'Energizers and fresh fruits',
      'Professional mountain guide',
      'Photography',
    ],
    includes: ['Return transport', 'Professional guide', 'Entry fees', 'Fruits'],
    excludes: ['Meals', 'Personal expenses'],
    availability: [{ date: '7 Mar 2026', status: 'Available' }],
    testimonials: [],
    isFeatured: true,
    isPublished: true,
    featuredOrder: 5,
    whatsappNumber: WHATSAPP_NUMBER,
  },
  {
    id: 'safari-rally-edition',
    slug: 'safari-rally-edition',
    title: 'Safari Rally Edition',
    short: 'Motorsport energy, scenic routes, and a front-row rally weekend.',
    summary:
      'Experience the dust, speed, and spectacle of Safari Rally Kenya with transport, rally access, and a guided fan experience.',
    description:
      'Experience the thrill of the World Rally Championship Safari Rally Kenya with Sunrise Tours and Adventure in Naivasha. This special edition is designed for motorsport lovers and adventure seekers who want front-row access to one of the world\'s most iconic rally events.',
    heroImage: '/images/safari-rally/1.jpg',
    gallery: [
      '/images/safari-rally/1.jpg',
      '/images/safari-rally/2.jpg',
      '/images/safari-rally/3.jpg',
      '/images/safari-rally/4.jpg',
    ],
    dateLabel: '14 - 15 Mar 2026',
    location: 'Naivasha - WRC Safari Rally',
    priceLabel: 'From KES 3,500',
    priceValue: 3500,
    mapEmbed: 'https://www.google.com/maps?q=Naivasha%20Kenya&output=embed',
    highlights: [
      'Transport to and from Nairobi and Naivasha',
      'WRC Safari Rally access',
      'Guided tour of rally stages',
      'Professional photography',
      'Refreshments',
    ],
    includes: ['Return transport', 'Rally access', 'Guide support', 'Refreshments'],
    excludes: ['Accommodation', 'Personal expenses'],
    availability: [{ date: '14 - 15 Mar 2026', status: 'Available' }],
    testimonials: [],
    isFeatured: true,
    isPublished: true,
    featuredOrder: 6,
    whatsappNumber: WHATSAPP_NUMBER,
  },
];

function sortTours(tours: TourRecord[]) {
  return [...tours].sort(
    (left, right) =>
      left.featuredOrder - right.featuredOrder || left.title.localeCompare(right.title)
  );
}

export function listAllTours() {
  return sortTours(TOURS);
}

export function listPublishedTours() {
  return sortTours(TOURS.filter((tour) => tour.isPublished));
}

export function listFeaturedTours(limit = 5) {
  return listPublishedTours()
    .filter((tour) => tour.isFeatured)
    .slice(0, limit);
}

export function getTourBySlug(slug: string) {
  return TOURS.find((tour) => tour.slug === slug);
}

export function getPublishedTourBySlug(slug: string) {
  return TOURS.find((tour) => tour.slug === slug && tour.isPublished);
}

export default TOURS;
