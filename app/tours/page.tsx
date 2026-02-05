import React from 'react';
import ToursGrid from './tours-grid';

interface Tour {
  id: string;
  short: string;
  title: string;
  heroImage: string;
  video: string;
  date: string;
  location: string;
  price: string;
  mapEmbed: string;
  description: string;
  highlights: string[];
  gallery: string[];
  includes: string[];
  excludes: string[];
  availability: Array<{ date: string; status: string }>;
  testimonials: Array<{ name?: string; image?: string; text: string }>;
}

const tours: Record<string, Tour> = {
  'tigoni-experience': {
    id: 'tigoni-experience',
    short: 'Tigoni',
    title: 'Tigoni Experience',
    heroImage: '/images/tour-island.jpg',
    video: '',
    date: '24th Jan 2026',
    location: 'Tigoni, Limuru',
    price: 'KES 2,800',
    mapEmbed: 'https://www.google.com/maps?q=Tigoni%20Limuru&output=embed',
    description: `Escape the busy city life and immerse yourself in the cool, green landscapes of Tigoni.
This one-day farm and countryside experience blends nature walks, relaxation, light adventure,
and breathtaking scenery — perfect for friends, couples, and solo explorers.`,
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
      'Relaxation & photo moments',
      'Group bonding experience',
    ],
    gallery: [
      '/images/tigoni/1.jpg',
      '/images/tigoni/2.jpg',
      '/images/tigoni/3.jpg',
      '/images/tigoni/4.jpg',
    ],
    includes: ['Return transport', 'Professional guide', 'Entry fees'],
    excludes: ['Meals', 'Personal expenses'],
    availability: [{ date: '24 Jan 2026', status: 'Available' }],
    testimonials: [
      {
        name: 'Alice W.',
        image: '/images/people/1.jpg',
        text: 'Peaceful, refreshing and very well organised.',
      },
    ],
  },

  'valentines-sironka-resort': {
    id: 'valentines-sironka-resort',
    short: 'Sironka Resort',
    title: 'Valentines Edition – Sironka Resort',
    heroImage: '/images/tour-island.jpg',
    gallery: [
      '/images/sironka/1.jpg',
      '/images/sironka/2.jpg',
      '/images/sironka/3.jpg',
      '/images/sironka/4.jpg',
      '/images/sironka/5.jpg',
    ],
    video: '',
    date: '14th Jan 2026',
    location: 'Sironka Valley Resort',
    price: 'KES 3,800',
    mapEmbed: 'https://www.google.com/maps?q=Sironka%20Valley%20Resort&output=embed',
    description: `Celebrate love, friendship, and adventure this Valentine's Day with an unforgettable experience at Sironka Valley Resort.`,
    highlights: [
      'Transport to and from Sironka Valley Resort',
      'Welcome drink upon arrival',
      'Accommodation in cozy tents or cottages',
      'Entrance fees',
      'Team-building activities',
      'Zip lining experience',
      'Lunch',
      'Games onboard',
      'Professional photography',
      'Zumba dance session',
      'Drinking water',
    ],
    includes: ['Return transport', 'Professional guide', 'Entry fees'],
    excludes: ['Meals', 'Personal expenses'],
    availability: [{ date: '14 Jan 2026', status: 'Available' }],
    testimonials: [],
  },

  'nyamindi-hike': {
    id: 'nyamindi-hike',
    short: 'Nyamindi',
    title: 'Nyamindi Hike',
    heroImage: '/images/tour-safari.jpg',
    gallery: [
      '/images/nyamindi/1.jpg',
      '/images/nyamindi/2.jpg',
      '/images/nyamindi/3.jpg',
      '/images/nyamindi/5.jpg',
      '/images/nyamindi/6.jpg',
    ],
    video: '',
    date: '28th Jan 2026',
    location: 'Kathandeni Forest – Nyamindi Falls',
    price: 'KES 2,850',
    mapEmbed: 'https://www.google.com/maps?q=Nyamindi%20Falls&output=embed',
    description: `Join us for an exciting nature escape to Nyamindi Falls, hidden deep within the lush Kathandeni Forest.`,
    highlights: [
      'Guided hike to Nyamindi Falls',
      'Transport to and from the hiking point',
      'Forest entrance fees',
      'Energizers and fresh fruits',
      'Professional ranger/forest guide',
      'Photography',
    ],
    includes: ['Return transport', 'Professional guide', 'Entry fees'],
    excludes: ['Meals', 'Personal expenses'],
    availability: [{ date: '28 Jan 2026', status: 'Available' }],
    testimonials: [],
  },

  'satima-hike': {
    id: 'satima-hike',
    short: 'Satima',
    title: 'Satima Hike',
    heroImage: '/images/satima.jpg',
    gallery: ['/images/satima/1.jpg', '/images/satima/2.jpg', '/images/satima/3.jpg'],
    video: '',
    date: '7th March 2026',
    location: 'Aberdare Ranges – Satima Peak',
    price: 'KES 3,800',
    mapEmbed: 'https://www.google.com/maps?q=aberdare&output=embed',
    description: `Challenge yourself with an unforgettable hiking experience to Satima Peak.`,
    highlights: [
      'Guided hike to Satima Peak',
      'Transport to and from the hiking point',
      'Aberdare National Park entry fees',
      'Energizers and fresh fruits',
      'Professional mountain guide',
      'Photography',
    ],
    includes: ['Return transport', 'Professional guide', 'Entry fees'],
    excludes: ['Meals', 'Personal expenses'],
    availability: [{ date: '7 Mar 2026', status: 'Available' }],
    testimonials: [],
  },
  'safari-rally-edition': {
    id: 'safari-rally-edition',
    short: 'Safari Rally',
    title: 'Safari Rally Edition',
    heroImage: '/images/safari-rally/1.jpg',
    gallery: [
      '/images/safari-rally/1.jpg',
      '/images/safari-rally/2.jpg',
      '/images/safari-rally/3.jpg',
      '/images/safari-rally/4.jpg',
    ],
    video: '',
    date: '20th March 2026',
    location: 'Nairobi – Naivasha – Narok',
    price: 'KES 3,500',
    mapEmbed: 'https://www.google.com/maps?q=Naivasha%20Kenya&output=embed',
    description: `Experience the thrill of the World Rally Championship (WRC) Safari Rally Kenya with Sunrise Tours & Adventure in Naivasha.`,
    highlights: [
      'Transport to and from Nairobi to Naivasha',
      'WRC Safari Rally access',
      'Guided tour of rally stages',
      'Professional photography',
      'Meals and refreshments',
    ],
    includes: ['Return transport', 'Professional guide', 'Entry fees'],
    excludes: ['Meals', 'Personal expenses'],
    availability: [{ date: '14 - 15 Mar 2026', status: 'Available' }],
    testimonials: [],
  },
};

export default function ToursPage() {
  return <ToursGrid tours={tours} />;
}
