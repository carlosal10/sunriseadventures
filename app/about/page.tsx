'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/* ---------------- ABOUT HERO SLIDES ---------------- */
const aboutSlides = [
  {
    src: '/images/about-hero.jpg',
    title: 'About Sunrise Tours & Adventure',
    text: 'More than trips — we create bold experiences, real connections, and lasting memories.',
  },
  {
    src: '/images/about-hero-2.jpg',
    title: 'Built for True Explorers',
    text: 'Adventure-filled journeys designed for people who crave more than ordinary travel.',
  },
  {
    src: '/images/about-hero-3.jpg',
    title: 'Moments That Matter',
    text: 'From mountain trails to iconic events, every experience is crafted with purpose.',
  },
];

/* ---------------- HERO SLIDESHOW ---------------- */
function AboutHeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % aboutSlides.length);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[50vh] min-h-[350px] rounded-2xl overflow-hidden">
      {aboutSlides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            priority={i === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="px-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {aboutSlides[index].title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">{aboutSlides[index].text}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PAGE ---------------- */
export default function About() {
  return (
    <div className="space-y-20">
      <AboutHeroSlideshow />

      {/* INTRO */}
      <section className="max-w-4xl space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>Sunrise Tours & Adventure</strong> is a dynamic and modern travel and adventure
          company built for explorers who crave more than ordinary trips. We are passionate about
          creating exciting, well-curated outdoor experiences that bring people closer to nature,
          adventure, and each other.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          From scenic hikes and waterfall chases to farm adventures, camping experiences, game drive
          safaris, and major event trips such as the WRC Safari Rally, we design journeys that are
          bold, memorable, and full of life.
        </p>
      </section>

      {/* BELIEF & APPROACH */}
      <section className="max-w-4xl space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          At Sunrise Tours & Adventure, we believe travel is about moments, energy, and connection.
          Our experiences are designed for individuals, couples, friends, and groups who want to
          escape routine, explore Kenya’s diverse landscapes, and create stories worth sharing.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Whether it’s conquering a challenging mountain trail, relaxing in a serene countryside
          setting, or soaking in the excitement of a global motorsport event, every trip is crafted
          with purpose and passion.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          We pride ourselves on delivering well-organized, affordable, and seamless adventures
          without compromising on quality or safety. Our team pays close attention to detail — from
          transport and guides to experiences and group dynamics — ensuring every journey runs
          smoothly from start to finish.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          We focus on responsible tourism, respect for nature, and meaningful engagement with the
          destinations we explore.
        </p>
      </section>

      {/* WHAT SETS US APART */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-orange-600">Personalized Adventures</h3>
          <p className="text-gray-600 leading-relaxed">
            What sets us apart is our personalized approach. No two trips are the same, because no
            two travelers are the same.
          </p>
        </div>

        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-orange-600">Shared Experiences</h3>
          <p className="text-gray-600 leading-relaxed">
            We create experiences that feel less like traditional tours and more like shared
            adventures among friends.
          </p>
        </div>

        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-orange-600">A Sense of Belonging</h3>
          <p className="text-gray-600 leading-relaxed">
            Our goal is to inspire confidence, excitement, and a true sense of belonging in every
            traveler who joins us.
          </p>
        </div>
      </section>

      {/* CLOSING */}
      <section className="max-w-4xl space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          At Sunrise Tours & Adventure, we don’t just take you to destinations — we create
          experiences that spark adventure, build connections, and leave lasting memories long after
          the journey ends.
        </p>

        <p className="text-lg font-semibold text-orange-600">
          Come explore with us. Your next adventure starts here.
        </p>
      </section>
    </div>
  );
}
