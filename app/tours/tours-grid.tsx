'use client';

import Link from 'next/link';
import Image from 'next/image';

const tours = {
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
