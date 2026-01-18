import './globals.css';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Sunrise Tours & Adventure',
  description: 'Explore curated tours, safaris and travel experiences',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {/* HEADER */}
          <header className="bg-white shadow">
            <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
              {/* LOGO + NAME */}
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="Sunrise Tours & Adventure logo"
                  width={100}
                  height={100}
                  priority
                />
                <span className="text-xl font-bold tracking-tight">Sunrise Tours & Adventure</span>
              </Link>

              {/* NAV */}
              <nav className="hidden md:flex space-x-6 text-sm font-medium">
                <Link href="/" className="text-gray-700 hover:text-orange-600">
                  Home
                </Link>
                <Link href="/tours" className="text-gray-700 hover:text-orange-600">
                  Tours
                </Link>
                <Link href="/deals" className="text-gray-700 hover:text-orange-600">
                  Deals
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-orange-600">
                  About Us
                </Link>
                <Link href="/merchandise" className="hover:text-orange-500">
                  Merchandise
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-orange-600">
                  Contact Us
                </Link>
              </nav>
            </div>
          </header>

          {/* MAIN */}
          <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">{children}</main>

          {/* FOOTER */}
          <footer className="bg-gray-900 text-gray-300 mt-20">
            <div className="mx-auto max-w-6xl px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* ABOUT */}
              <div className="space-y-4">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src="/images/logo.png"
                    alt="Sunrise Tours & Adventure logo"
                    width={80}
                    height={80}
                  />
                  <span className="text-lg font-bold text-white">Sunrise Tours & Adventure</span>
                </Link>
                <p className="text-sm leading-relaxed text-gray-400">
                  Sunrise Tours & Adventure is a Kenyan-based travel company creating unforgettable
                  outdoor experiences — hikes, safaris, camping trips, countryside escapes and major
                  adventure events.
                </p>
              </div>

              {/* QUICK LINKS */}
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/" className="hover:text-orange-500">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/tours" className="hover:text-orange-500">
                      Tours
                    </Link>
                  </li>
                  <li>
                    <Link href="/deals" className="hover:text-orange-500">
                      Deals
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-orange-500">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/merchandise" className="hover:text-orange-500">
                      Merchandise
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-orange-500">
                      Contact Us
                    </Link>
                  </li>
                  <li></li>
                </ul>
              </div>

              {/* POPULAR EXPERIENCES */}
              <div>
                <h4 className="text-white font-semibold mb-4">Popular Experiences</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Mountain & Forest Hikes</li>
                  <li>Camping Adventures</li>
                  <li>Coastal Getaways</li>
                  <li>Game Drive Safaris</li>
                  <li>WRC Safari Rally Trips</li>
                </ul>
              </div>

              {/* CONTACT */}
              <div>
                <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>📍 Nairobi, Kenya</li>
                  <li>📞 +254 721 533032</li>
                  <li>✉️ info@sunrisetours.co.ke</li>
                  <li>✉️ sunrisetourke@gmail.com</li>
                  <li>bookingsunrisetours@gmail.com</li>
                </ul>

                {/* SOCIALS */}
                <div className="flex gap-4 mt-4 text-sm">
                  <a href="#" className="hover:text-orange-500" aria-label="Instagram">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-orange-500" aria-label="Facebook">
                    Facebook
                  </a>
                  <a href="#" className="hover:text-orange-500" aria-label="WhatsApp">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-gray-800">
              <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Sunrise Tours & Adventure. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
