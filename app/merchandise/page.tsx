'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    price: 'KES 400',
    image: '/images/merch-cap.jpg',
    category: 'Accessories',
    inStock: true,
  },
  {
    id: 'sunrise-tshirt',
    name: 'Sunrise Branded T-Shirt',
    price: 'KES 650',
    image: '/images/merch-tshirt.jpg',
    category: 'Apparel',
    inStock: true,
  },
];

export default function MerchandisePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-20">
      <section className="relative min-h-[380px] overflow-hidden rounded-2xl h-[50vh]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
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

        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-3xl px-8">
            <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
              {heroSlides[activeSlide].title}
            </h1>
            <p className="mb-6 text-lg text-gray-200">{heroSlides[activeSlide].subtitle}</p>

            <Link
              href="#shop"
              className="inline-block rounded-lg bg-orange-600 px-7 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Shop Merchandise
            </Link>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeSlide ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-4">
        {['All', 'Apparel', 'Accessories'].map((category) => (
          <span
            key={category}
            className="cursor-pointer rounded-full border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-orange-500 hover:text-white"
          >
            {category}
          </span>
        ))}
      </section>

      <section id="shop">
        <h2 className="mb-8 text-3xl font-bold">Shop Merchandise</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="relative overflow-hidden rounded-xl border shadow-sm transition hover:shadow-md"
            >
              {!product.inStock && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-black/80 px-3 py-1 text-xs text-white">
                  Sold Out
                </span>
              )}

              <div className="relative h-56">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>

              <div className="space-y-2 p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-orange-600">{product.price}</span>

                  {product.inStock ? (
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-orange-600 hover:underline"
                    >
                      Order -&gt;
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

      <section className="rounded-2xl bg-gray-100 p-10 text-center">
        <h2 className="mb-4 text-3xl font-bold">Bulk Orders and Custom Merchandise</h2>
        <p className="mx-auto mb-6 max-w-2xl text-gray-600">
          Ideal for hiking groups, corporate retreats, and adventure events. Custom branding is
          available.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-lg bg-orange-600 px-8 py-3 font-semibold text-white hover:bg-orange-700"
        >
          Request a Quote
        </Link>
      </section>
    </div>
  );
}
