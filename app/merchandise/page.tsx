'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const heroSlides = [
  {
    image: '/images/merch-hoodie.jpg',
    title: 'Adventure wear that still looks composed',
    subtitle: 'Warm layers, clean branding, and pieces made for group travel days.',
  },
  {
    image: '/images/merch-cap.jpg',
    title: 'Caps for trail days and coast runs',
    subtitle: 'Lightweight protection with a polished Sunrise identity.',
  },
  {
    image: '/images/merch-tshirt.jpg',
    title: 'Carry the trip after it ends',
    subtitle: 'Simple branded essentials for guests, groups, and crews.',
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
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-20">
      <section className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] border border-white/60 shadow-[0_28px_90px_rgba(63,41,22,0.16)] h-[62vh]">
        {heroSlides.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#160f0a]/82 via-[#160f0a]/36 to-transparent" />
          </div>
        ))}

        <div className="relative z-10 flex h-full items-end p-7 md:p-12">
          <div className="max-w-4xl">
            <p className="eyebrow mb-4 text-[#f0bd6b]">Sunrise merchandise</p>
            <h1 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-[#fffaf1] md:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{slide.subtitle}</p>
            <Link href="#shop" className="btn-primary mt-8">
              Shop Merchandise
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          {heroSlides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeSlide ? 'w-12 bg-[#f0bd6b]' : 'w-6 bg-white/45'
              }`}
              aria-label={`Show ${item.title}`}
            />
          ))}
        </div>
      </section>

      <section id="shop">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Shop the kit</p>
            <h2 className="display-title">Merchandise with a cleaner finish.</h2>
          </div>
          <p className="max-w-md leading-7 text-[#715f4e]">
            Built for hiking groups, retreats, event crews, and anyone who wants the memory to last
            beyond the trip.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="premium-card group overflow-hidden">
              <div className="relative h-72">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-[#fffaf1]/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#16372c]">
                  {product.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-3xl font-semibold leading-none text-[#21170f]">
                  {product.name}
                </h3>
                <div className="mt-6 flex items-center justify-between border-t border-[#21170f]/10 pt-5">
                  <span className="font-bold text-[#b86232]">{product.price}</span>
                  <Link href="/contact" className="btn-secondary px-5 py-2">
                    Order
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-[#16372c] p-8 text-center text-[#fffaf1] md:p-12">
        <p className="eyebrow mb-4 text-[#d8a04a]">Custom runs</p>
        <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] md:text-6xl">
          Bulk orders and custom group merchandise.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#f7ead4]/75">
          Ideal for hiking groups, corporate retreats, school groups, and adventure events. We can
          help plan branded pieces around your trip.
        </p>
        <Link href="/contact" className="btn-primary mt-8">
          Request a Quote
        </Link>
      </section>
    </div>
  );
}
