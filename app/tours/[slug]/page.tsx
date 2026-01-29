'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ---------------- NORMALIZED TOUR DATA ---------------- */
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
    description: `Celebrate love, friendship, and adventure this Valentine’s Day with an unforgettable experience at Sironka Valley Resort.`,
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
    date: '20th March 2026',
    location: 'Nairobi – Naivasha – Narok',
    price: 'KES 3,500',
    mapEmbed: 'https://www.google.com/maps?q=Naivasha%20Kenya&output=embed',
    description: `Experience the thrill of the World Rally Championship (WRC) Safari Rally Kenya with Sunrise Tours & Adventure in Naivasha.`,
    highlights: [
      'Transport to and from Nairobi to Naivasha',
      'Accommodation in Naivasha',
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

/* ---------------- PAGE ---------------- */
export default function TourDetails({ params }: { params: { slug: string } }) {
  const tour = tours[params.slug as keyof typeof tours];
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!tour) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Tour not found</h2>
        <Link href="/" className="text-orange-600 mt-4 inline-block">
          ← Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative h-[60vh] rounded-2xl overflow-hidden">
        <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-end p-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">{tour.title}</h1>
            <p className="text-gray-200 mt-2">
              {tour.location} • {tour.date}
            </p>
          </div>
        </div>
      </section>

      {/* FULLSCREEN PREVIEW */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <Image src={lightbox} alt="" width={1200} height={800} className="object-contain" />
        </div>
      )}

      {/* CONTENT */}
      <section className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">Tour Overview</h2>
          <p className="text-gray-700">{tour.description}</p>

          <ul className="list-disc list-inside text-gray-700">
            {tour.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <aside className="border rounded-xl p-6 space-y-4 h-fit">
          <p className="flex justify-between">
            <span>Price</span>
            <span className="font-bold text-orange-600">{tour.price}</span>
          </p>
          <Link
            href={`/tours/${params.slug}/book`}
            className="block text-center bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
          >
            Book This Tour
          </Link>
        </aside>
      </section>

      {/* PHOTO COLLAGE */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Photo Highlights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tour.gallery.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightbox(img)}
              className={`relative cursor-pointer rounded-xl overflow-hidden ${
                i === 0 ? 'col-span-2 row-span-2 h-80' : 'h-40'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover hover:scale-105 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* AVAILABILITY */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Availability</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {tour.availability.map((a) => (
            <div key={a.date} className="border rounded-xl p-4">
              <p className="font-semibold">{a.date}</p>
              <p className="text-sm">{a.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Location</h2>
        <iframe src={tour.mapEmbed} className="w-full h-96 rounded-xl border" loading="lazy" />
      </section>
    </div>
  );
}
