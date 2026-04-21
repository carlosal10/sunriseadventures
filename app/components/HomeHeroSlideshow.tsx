'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    src: '/images/hero-beach.jpg',
    label: 'Curated escapes',
    headline: 'Travel that feels considered, hosted, and unforgettable',
    text: 'Premium group adventures across Kenya, built around striking places, warm hosting, and smooth logistics.',
  },
  {
    src: '/images/hero-safari.jpg',
    label: 'Wild landscapes',
    headline: 'Experience Africa with confidence and style',
    text: 'From game drives to lodge escapes, we shape every detail so the journey feels effortless.',
  },
  {
    src: '/images/hero-mountain.jpg',
    label: 'Trail days',
    headline: 'Mountain air, beautiful routes, and better stories',
    text: 'Guided hikes and outdoor experiences designed for groups that want adventure without chaos.',
  },
  {
    src: '/images/hero-mini.jpg',
    label: 'Good company',
    headline: 'Join trips that feel polished, social, and alive',
    text: 'Thoughtful itineraries, reliable coordination, and moments worth keeping.',
  },
];

export default function HomeHeroSlideshow() {
  const [index, setIndex] = useState(0);
  const activeSlide = slides[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[620px] overflow-hidden rounded-[2.5rem] border border-white/60 shadow-[0_34px_100px_rgba(63,41,22,0.18)] h-[78vh]">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#160f0a]/85 via-[#1f160e]/48 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#160f0a]/70 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 grid h-full items-end gap-8 p-5 md:grid-cols-[1fr_22rem] md:p-10 lg:p-14">
        <div className="max-w-4xl pb-4">
          <p className="eyebrow mb-5 text-[#f0bd6b]">{activeSlide.label}</p>
          <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-[#fffaf1] md:text-7xl lg:text-8xl">
            {activeSlide.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#fffaf1]/80 md:text-xl">
            {activeSlide.text}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/tours" className="btn-primary">
              Explore Upcoming Trips
            </Link>
            <Link href="/contact" className="btn-secondary border-white/25 bg-white/15 text-white hover:bg-white/25">
              Talk to a Planner
            </Link>
          </div>
        </div>

        <div className="glass-panel hidden p-5 text-[#fffaf1] md:block">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f0bd6b]">
            Why guests book
          </p>
          <div className="mt-6 grid gap-5">
            {[
              ['Curated routes', 'No random stops or rushed planning.'],
              ['Hosted groups', 'Warm coordination before, during, and after.'],
              ['Trusted logistics', 'Transport, guides, timing, and details handled.'],
            ].map(([title, text]) => (
              <div key={title} className="border-t border-white/15 pt-4">
                <p className="font-display text-2xl font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-6 text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-20 flex gap-2 md:left-14">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show ${slide.label}`}
            onClick={() => setIndex(slideIndex)}
            className={`h-1.5 rounded-full transition-all ${
              slideIndex === index ? 'w-12 bg-[#f0bd6b]' : 'w-6 bg-white/45'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
