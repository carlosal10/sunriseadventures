import './globals.css';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';

export const metadata = {
  title: 'Sunrise Tours & Adventure',
  description: 'Explore curated tours, safaris and travel experiences',
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
        <div className="min-h-screen flex flex-col">
          {/* HEADER */}
          <Header />
            
                      {/* MAIN */}
                      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
                        {children}
                      </main>
            
                      {/* FOOTER */}
                      <footer className="bg-gray-900 text-gray-300 mt-20">
                        <div className="mx-auto max-w-6xl px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
                          {/* ABOUT */}
                          <div className="space-y-4">
                            <Link href="/" className="flex items-center gap-3">
                              <Image
                                src="/images/logo.png"
                                alt="Sunrise Tours & Adventure logo"
                                width={70}
                                height={70}
                              />
                              <span className="text-lg font-bold text-white">
                                Sunrise Tours & Adventure
                              </span>
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
                              {navLinks.map((link) => (
                                <li key={link.href}>
                                  <Link href={link.href} className="hover:text-orange-500">
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
            
                          {/* EXPERIENCES */}
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
                              <li>✉️ bookingsunrisetours@gmail.com</li>
                            </ul>
                          </div>
                        </div>
            
                        <div className="border-t border-gray-800">
                          <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-gray-500">
                            © {new Date().getFullYear()} Sunrise Tours & Adventure. All rights reserved.
                          </div>
                        </div>
                      </footer>
                    </div>
                  </body>
                </html>
              )
            }
