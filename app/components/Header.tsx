"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tours', label: 'Tours' },
  { href: '/about', label: 'About' },
  { href: '/merchandise', label: 'Merchandise' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 px-3 py-3">
      <div className="section-shell">
        <div className="flex items-center justify-between rounded-full border border-white/60 bg-[#fffaf1]/85 px-4 py-3 shadow-[0_18px_50px_rgba(63,41,22,0.12)] backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-[#16372c] ring-1 ring-[#d8a04a]/35">
              <Image
                src="/images/logo.png"
                alt="Sunrise Tours & Adventure logo"
                width={52}
                height={52}
                priority
                className="h-12 w-12 object-cover"
              />
            </span>
            <span>
              <span className="block font-display text-xl font-semibold leading-none tracking-[-0.03em] text-[#21170f]">
                Sunrise
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#715f4e]">
                Tours & Adventure
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[#21170f]/10 bg-white/55 p-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? 'bg-[#16372c] text-[#fffaf1] shadow-sm'
                      : 'text-[#4f3e2f] hover:bg-[#f2dfbf] hover:text-[#21170f]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/tours" className="btn-primary hidden md:inline-flex">
            Reserve a Trip
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#21170f]/15 text-[#21170f] md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            type="button"
          >
            <svg width="21" height="21" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <button
          className="fixed inset-0 bg-[#21170f]/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu overlay"
          type="button"
        />
      )}

      <div
        className={`fixed right-4 top-4 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-[2rem] border border-white/60 bg-[#fffaf1] p-5 shadow-2xl transition duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
        }`}
        role="dialog"
        aria-modal={mobileOpen}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-2xl font-semibold text-[#21170f]">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#21170f]/15 text-[#21170f]"
            aria-label="Close menu"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl px-4 py-3 text-sm font-bold text-[#4f3e2f] hover:bg-[#f2dfbf]"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/tours" className="btn-primary mt-3">
            Reserve a Trip
          </Link>
        </nav>
      </div>
    </header>
  );
}
