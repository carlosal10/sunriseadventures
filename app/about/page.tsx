'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const aboutSlides = [
  {
    src: '/images/about-hero.jpg',
    title: 'Premium adventures with a Kenyan heartbeat',
    text: 'More than trips - we create bold experiences, real connections, and lasting memories.',
  },
  {
    src: '/images/about-hero-2.jpg',
    title: 'Built for true explorers',
    text: 'Adventure-filled journeys designed for people who crave more than ordinary travel.',
  },
  {
    src: '/images/about-hero-3.jpg',
    title: 'Moments that feel considered',
    text: 'From mountain trails to iconic events, every experience is crafted with purpose.',
  },
];

function AboutHeroSlideshow() {
  const [index, setIndex] = useState(0);
  const activeSlide = aboutSlides[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % aboutSlides.length);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] border border-white/60 shadow-[0_28px_90px_rgba(63,41,22,0.16)] h-[60vh]">
      {aboutSlides.map((slide, slideIndex) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            slideIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            priority={slideIndex === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#160f0a]/85 via-[#160f0a]/42 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-end p-7 md:p-12">
        <div className="max-w-4xl">
          <p className="eyebrow mb-4 text-[#f0bd6b]">About Sunrise</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-[#fffaf1] md:text-7xl">
            {activeSlide.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{activeSlide.text}</p>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="space-y-20">
      <AboutHeroSlideshow />

      <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow mb-3">Who we are</p>
          <h2 className="display-title">Adventure, but with better taste and tighter planning.</h2>
        </div>
        <div className="premium-card space-y-6 p-7 text-lg leading-8 text-[#715f4e] md:p-10">
          <p>
            <strong className="text-[#21170f]">Sunrise Tours & Adventure</strong> is a modern
            travel and adventure company built for explorers who crave more than ordinary trips.
            We create well-curated outdoor experiences that bring people closer to nature,
            adventure, and each other.
          </p>
          <p>
            From scenic hikes and waterfall chases to lodge escapes, camping experiences, game
            drive safaris, and major event trips such as the WRC Safari Rally, our journeys are
            designed to feel bold, memorable, and well hosted.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            title: 'Personalized Adventures',
            text: 'No two trips are treated the same. We tailor the route, mood, and logistics to the people joining.',
          },
          {
            title: 'Shared Experiences',
            text: 'Our trips feel social and warm without becoming disorganized or noisy.',
          },
          {
            title: 'A Sense of Belonging',
            text: 'We want every guest to feel expected, guided, and part of something memorable.',
          },
        ].map((item) => (
          <div key={item.title} className="premium-card p-7">
            <h3 className="font-display text-3xl font-semibold leading-none text-[#21170f]">
              {item.title}
            </h3>
            <p className="mt-5 leading-7 text-[#715f4e]">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-[2.5rem] bg-[#16372c] p-7 text-[#fffaf1] md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow mb-4 text-[#d8a04a]">Our approach</p>
            <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] md:text-6xl">
              We obsess over the details guests should never have to worry about.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-[#f7ead4]/75">
            <p>
              We believe travel is about moments, energy, and connection. Our experiences are
              designed for individuals, couples, friends, and groups who want to escape routine,
              explore Kenya&apos;s diverse landscapes, and create stories worth sharing.
            </p>
            <p>
              We pay close attention to transport, guides, venue quality, pacing, safety, and group
              dynamics so every journey runs smoothly from start to finish.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
