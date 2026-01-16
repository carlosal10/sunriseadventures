'use client';

import Link from 'next/link';
import Image from 'next/image';

const tours = {
  'tigoni-experience': {
    title: 'Tigoni Experience',
    heroImage: '/images/tour-island.jpg',

    video: '', // optional
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
    title: 'Safari Rally Edition',
    heroImage: '/images/safari-rally/1.jpg',
    gallery: [
      '/images/safari-rally/1.jpg',
      '/images/safari-rally/2.jpg',
      '/images/safari-rally/3.jpg',
      '/images/safari-rally/4.jpg',
    ],
    video: '',

    date: '20th June 2026',
    location: 'Various Locations in Kenya',

    price: 'KES 5,000',
    mapEmbed: 'https://www.google.com/maps?q=Kenya&output=embed',
    description: `Experience the thrill of the Safari Rally like never before with our exclusive Safari Rally Edition tour. Witness the high-octane action up close as you explore various iconic locations across Kenya.`,
    highlights: [
      'Front-row access to Safari Rally stages',
      'Guided tours of rally locations',
      'Comfortable transport in a safari van',
      'Professional rally guide',
      'Refreshments and snacks',
      'Professional photography',
      'Meals and refreshments',
    ],
    includes: ['Return transport', 'Professional guide', 'Entry fees'],
    excludes: ['Meals', 'Personal expenses'],
    availability: [{ date: '20 Jun 2026', status: 'Available' }],
    testimonials: [],
  },
};

type Tour = {
  id?: string;
  title: string;
  short?: string;
  heroImage: string;
  description: string;
  location: string;
  price: string;
};

export default function ToursGrid({ tours }: { tours: Record<string, Tour> }) {
  // Convert tours object to array for display
  const toursArray = Object.entries(tours).map(([slug, tour]: any) => ({
    slug,
    ...tour,
  }));

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-extrabold mb-4">Our Tours</h1>
        <p className="text-gray-600 text-lg">Explore unforgettable adventures across Kenya</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {toursArray.map((tour: any) => (
          <Link key={tour.slug} href={`/tours/${tour.slug}`} className="group">
            <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={tour.heroImage}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition">
                  {tour.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {tour.description.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{tour.location}</span>
                  <span className="font-bold text-orange-600">{tour.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
