'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* HERO SLIDESHOW ITEMS */
const heroSlides = [
  {
    image: '/images/merch-hoodie.jpg',
    title: 'Sunrise Adventure Hoodie',
    subtitle: 'Warm. Rugged. Built for explorers.',
  },
  {
    image: '/images/merch-cap.jpg',
    title: 'Sunrise Travel Cap',
    subtitle: 'Lightweight protection for every journey.',
  },
  {
    image: '/images/merch-tshirt.jpg',
    title: 'Sunrise Branded T-Shirt',
    subtitle: 'Wear the adventure wherever you go.',
  },
];

/* MERCH PRODUCTS */
const products = [
  {
    id: 'sunrise-hoodie',
    name: 'Sunrise Adventure Hoodie',
    price: 'KES 3,500',
    image: '/images/merch-hoodie.jpg',
    category: 'Apparel',
    inStock: true,
  },
  {
    id: 'sunrise-cap',
    name: 'Sunrise Travel Cap',
    price: 'KES 1,200',
    image: '/images/merch-cap.jpg',
    category: 'Accessories',
    inStock: true,
  },
  {
    id: 'sunrise-tshirt',
    name: 'Sunrise Branded T-Shirt',
    price: 'KES 1,800',
    image: '/images/merch-tshirt.jpg',
    category: 'Apparel',
    inStock: false,
  },
  {
    id: 'sunrise-water-bottle',
    name: 'Sunrise Water Bottle',
    price: 'KES 1,500',
    image: '/images/merch-bottle.jpg',
    category: 'Gear',
    inStock: true,
  },
];

export default function MerchandisePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-20">
      {/* ================= HERO SLIDESHOW ================= */}
      <section className="relative h-[50vh] min-h-[380px] rounded-2xl overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
        ))}

        {/* HERO CONTENT */}
        <div className="relative z-10 h-full flex items-center">
          <div className="px-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              {heroSlides[activeSlide].title}
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              {heroSlides[activeSlide].subtitle}
            </p>

            <Link
              href="#shop"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-7 py-3 rounded-lg font-semibold"
            >
              Shop Merchandise
            </Link>
          </div>
        </div>

        {/* SLIDE INDICATORS */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="flex flex-wrap gap-4">
        {['All', 'Apparel', 'Accessories', 'Gear'].map((cat) => (
          <span
            key={cat}
            className="px-4 py-2 rounded-full border text-sm font-medium text-gray-700 hover:bg-orange-500 hover:text-white cursor-pointer transition"
          >
            {cat}
          </span>
        ))}
      </section>

      {/* ================= PRODUCTS ================= */}
      <section id="shop">
        <h2 className="text-3xl font-bold mb-8">Shop Merchandise</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <article
              key={product.id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition relative"
            >
              {!product.inStock && (
                <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full z-10">
                  Sold Out
                </span>
              )}

              <div className="relative h-56">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-orange-600">
                    {product.price}
                  </span>

                  {product.inStock ? (
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-orange-600 hover:underline"
                    >
                      Order →
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">Unavailable</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gray-100 rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Bulk Orders & Custom Merchandise
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Ideal for hiking groups, corporate retreats, and adventure events.
          Custom branding available.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Request a Quote
        </Link>
      </section>
    </div>
  );
}
