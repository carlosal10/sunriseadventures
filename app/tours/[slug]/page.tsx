'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ---------------- NORMALIZED TOUR DATA ---------------- */
const tours = {
  'Lalanasi Lodge Trip': {
    title: 'Lalanasi Trip',
    heroImage: '/images/tour-island.jpg',

    video: '', // optional
    date: '4th may 2026',
    location: 'Lalanasi & Thompsons',
    price: 'KES 4,000',
    mapEmbed: 'https://maps.app.goo.gl/m3JkXjQnPFfzLZXd6=embed',
    description: `Escape the busy city life and immerse yourself in the cool, green landscapes of Tigoni.
This one-day farm and countryside experience blends nature walks, relaxation, light adventure,
and breathtaking scenery — perfect for friends, couples, and solo explorers.`,
    highlights: [
      'Transport To & From',
      'Photography',
      'Team Building',
      'Scenic hike',
      'QuadBike Experience',
      'Swimming',
      'Thompsons fall chase',
      'Lunch',
      'Farm Tour',
    ],
    gallery: [
      '/images/lalanasi/1.jpg',
      '/images/lalanasi/2.jpg',
      '/images/lalanasi/3.jpg',
      '/images/lalanasi/4.jpg',
       '/images/lalanasi/5.jpg',
      '/images/lalanasi/6.jpg',
    ],
    includes: ['Return transport', 'Lunch', 'Professional guide', 'Entry fees'],
    excludes: ['Personal expenses'],
    availability: [{ date: '4 May 2026', status: 'Available' }],
    testimonials: [
      {
        name: 'Owuor Timon.',
        image: '/images/people/1.jpg',
        text: 'Peaceful, Fun, refreshing and very well organised.',
      },
    ],
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
