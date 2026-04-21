'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    src: '/images/hero-beach.jpg',
    headline: 'Discover Kenya and beyond with Sunrise Tours and Adventure',
    text: 'Unforgettable journeys across beaches, safaris, mountains, and city escapes.',
  },
  {
    src: '/images/hero-safari.jpg',
    headline: 'Experience Africa Like Never Before',
    text: 'Wildlife encounters, scenic routes, and memorable guided experiences.',
  },
  {
    src: '/images/hero-mountain.jpg',
    headline: 'Adventure Awaits',
    text: 'Breathtaking landscapes, guided treks, and stories worth retelling.',
  },
  {
    src: '/images/hero-mini.jpg',
    headline: 'Travel With People Who Love the Journey',
    text: 'We design trips that feel warm, exciting, and easy to join.',
  },
];

export default function HomeHeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[500px] overflow-hidden rounded-2xl h-[70vh]">
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            slideIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.headline}
            fill
            priority={slideIndex === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-3xl px-8">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            {slides[index].headline}
          </h1>
          <p className="mb-6 text-lg text-gray-200 md:text-xl">{slides[index].text}</p>
          <Link
            href="/tours"
            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Book a Tour
          </Link>
        </div>
      </div>
    </section>
  );
}
