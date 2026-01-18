'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ---------------- HERO SLIDES ---------------- */
const slides = [
  {
    src: '/images/hero-beach.jpg',
    headline: 'Discover the world with Sunrise Travel & Tours',
    text: 'Unforgettable journeys — beaches, safaris, mountains and city escapes.',
  },
  {
    src: '/images/hero-safari.jpg',
    headline: 'Experience Africa Like Never Before',
    text: 'Luxury safaris, wildlife encounters and authentic cultural experiences.',
  },
  {
    src: '/images/hero-mountain.jpg',
    headline: 'Adventure Awaits',
    text: 'Breathtaking landscapes, guided treks and unforgettable memories.',
  },
  {
    src: '/images/hero-mini.jpg',
    headline: 'Adventure Awaits',
    text: 'Breathtaking landscapes, guided treks and unforgettable memories.',
  },
];

/* ---------------- HERO COMPONENT ---------------- */
function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[500px] rounded-2xl overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.headline}
            fill
            priority={i === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-3xl px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-white">
            {slides[index].headline}
          </h1>

          <p className="text-lg md:text-xl mb-6 text-gray-200">{slides[index].text}</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/tours"
              className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-lg font-semibold"
            >
              Book a Tour
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PAGE ---------------- */
export default function Home() {
  return (
    <div className="space-y-20">
      <HeroSlideshow />

      {/* FEATURED TOURS */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Upcoming Tours</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Tigoni Experience',
              desc: 'Escape the city and immerse yourself in a refreshing countryside experience with our Tigoni Farm Adventure. This one-day trip blends nature, relaxation, light adventure, and scenic landscapes—perfect for individuals, friends, and groups looking to unwind and explore.',
              date: '24th Jan 2026',
              price: 'From KES2800',
              image: '/images/tour-island.jpg',
              slug: 'tigoni-experience',
            },
            {
              title: 'Vallentines Edition-Sironka Resort',
              desc: `Celebrate love, friendship, and adventure this Valentine’s Day with an unforgettable experience at Sironka Valley Resort. Surrounded by breathtaking landscapes and fun-filled activities, this special Valentine Edition is perfect for couples, friends, and anyone looking to enjoy a unique outdoor getaway.
Whether you’re celebrating love, self-love, or good vibes with friends, this trip promises adventure, bonding, and lasting memories.`,
              date: '14th Feb 2026',

              price: 'From KES3800',
              image: '/images/tour-mountain.jpg',
              slug: 'vallentines-sironka-resort',
            },
            {
              title: 'Nyamindi Hike',
              desc: 'Join us for an exciting nature escape to Nyamindi Falls, hidden deep within the lush Kathandeni Forest. This guided hike is perfect for nature lovers, hikers, and adventure seekers looking to explore scenic forest trails and a beautiful waterfall in a peaceful, natural setting.',
              location: 'Kathandeni Forest – Nyamindi Falls',
              date: '28th Feb 2026',
              price: 'From KES2,850',
              image: '/images/tour-safari.jpg',
              slug: 'nyamindi-hike',
            },
            {
              title: 'Satima Hike',
              desc: 'Challenge yourself with an unforgettable hiking experience to Satima Peak, the highest point in the Aberdare Ranges and one of Kenya’s most scenic alpine destinations. This hike is perfect for adventure seekers looking to push their limits while enjoying breathtaking landscapes, open moorlands, and panoramic mountain views.',
              location: 'Aberdare Ranges – Satima Peak',
              date: '7th March 2026',
              price: 'From KES3,800',
              image: '/images/satima.jpg',
              slug: 'satima-hike',
            },
            {
              title: 'Safari Rally Edition',
              desc: `Experience the thrill of the World Rally Championship (WRC) Safari Rally Kenya with Sunrise Tours & Adventure in Naivasha. This special WRC Edition is designed for motorsport lovers and adventure seekers who want front-row access to one of the world’s most iconic rally events, set against the stunning landscapes of Naivasha.
From roaring engines and dust-filled stages to scenic views and vibrant fan zones, this is the ultimate rally adventure.`,
              location: 'Naivasha – WRC Safari Rally',
              date: '14th - 15th March 2026',
              price: 'From KES3,500',
              image: '/images/rally.jpg',
              slug: 'safari-rally-edition',
            },
          ].map((tour) => (
            <article
              key={tour.title}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-48">
                <Image src={tour.image} alt={tour.title} fill className="object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{tour.title}</h3>
                <p className="text-sm text-gray-600">{tour.desc}</p>
                {tour.location && <p className="text-sm text-gray-600">{tour.location}</p>}
                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold text-orange-600">{tour.date}</span>
                  <span className="font-semibold text-orange-600">{tour.price}</span>
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="text-sm text-orange-600 font-medium"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="bg-gray-50 rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-6"> Our Popular Tours</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Hikes', image: '/images/hiking.jpg' },
            { name: 'Coastal', image: '/images/coastal.jpg' },
            { name: 'Camping', image: '/images/camping.jpg' },
            { name: 'Game Drives', image: '/images/destination-kenya.jpg' },
          ].map((dest) => (
            <div key={dest.name} className="relative h-40 rounded-xl overflow-hidden">
              <Image src={dest.image} alt={dest.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                <span className="text-white font-semibold">{dest.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Why Choose Sunrise Travel & Adventure</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Authentic Kenyan Adventures',
              text: 'Every journey is customised to your interests, budget and schedule.',
            },
            {
              title: 'Personalized & Flexible Trips',
              text: 'We work with vetted hotels, guides and transport providers.',
            },
            {
              title: 'Memorable Group Experiences',
              text: 'From planning to return, our team supports you every step.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border rounded-xl">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-600 text-white rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us in the next Tour</h2>
        <p className="mb-6 text-orange-100">
          Let Sunrise Travel & Adventure design your next unforgettable adventure.
        </p>
        <Link
          href="/tours"
          className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold"
        >
          Book a Tour
        </Link>
      </section>
    </div>
  );
}
