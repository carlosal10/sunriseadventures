import './globals.css';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';

export const metadata = {
  title: 'Sunrise Tours & Adventure',
  description: 'Explore curated tours, safaris, and travel experiences',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tours', label: 'Tours' },
    { href: '/deals', label: 'Deals' },
    { href: '/about', label: 'About Us' },
    { href: '/merchandise', label: 'Merchandise' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>

          <footer className="mt-20 bg-gray-900 text-gray-300">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4">
              <div className="space-y-4">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src="/images/logo.png"
                    alt="Sunrise Tours & Adventure logo"
                    width={70}
                    height={70}
                  />
                  <span className="text-lg font-bold text-white">Sunrise Tours & Adventure</span>
                </Link>
                <p className="text-sm leading-relaxed text-gray-400">
                  Sunrise Tours & Adventure is a Kenyan travel company creating memorable outdoor
                  experiences across hikes, safaris, camping trips, countryside escapes, and major
                  adventure events.
                </p>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-orange-500">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-white">Popular Experiences</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Mountain and forest hikes</li>
                  <li>Camping adventures</li>
                  <li>Coastal getaways</li>
                  <li>Game drive safaris</li>
                  <li>Lalanasi lodge trips</li>
                  <li>WRC Safari Rally trips</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Location: Nairobi, Kenya</li>
                  <li>Phone: +254 118706567</li>
                  <li>Email: info@sunrisetours.co.ke</li>
                  <li>Email: sunrisetourke@gmail.com</li>
                  <li>Email: bookingsunrisetours@gmail.com</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800">
              <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-gray-500">
                Copyright {new Date().getFullYear()} Sunrise Tours & Adventure. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
