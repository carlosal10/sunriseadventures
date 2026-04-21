import './globals.css';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';

export const metadata = {
  title: 'Sunrise Tours & Adventure',
  description: 'Explore curated tours, safaris, and travel experiences',
};

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/tours', label: 'Tours' },
  { href: '/about', label: 'About Us' },
  { href: '/merchandise', label: 'Merchandise' },
  { href: '/contact', label: 'Contact Us' },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="section-shell flex-1 py-8 md:py-12">{children}</main>

          <footer className="mt-24 overflow-hidden rounded-t-[3rem] bg-[#122c24] text-[#fffaf1]">
            <div className="section-shell relative py-16">
              <div className="absolute -right-28 -top-32 h-72 w-72 rounded-full bg-[#d8a04a]/20 blur-3xl" />
              <div className="absolute -bottom-32 left-16 h-72 w-72 rounded-full bg-[#b86232]/20 blur-3xl" />

              <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr]">
                <div className="space-y-5">
                  <Link href="/" className="flex items-center gap-3">
                    <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-[#fffaf1] ring-1 ring-[#d8a04a]/50">
                      <Image
                        src="/images/logo.png"
                        alt="Sunrise Tours & Adventure logo"
                        width={68}
                        height={68}
                        className="h-16 w-16 object-cover"
                      />
                    </span>
                    <span>
                      <span className="block font-display text-3xl font-semibold leading-none">
                        Sunrise
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.32em] text-[#d8a04a]">
                        Tours & Adventure
                      </span>
                    </span>
                  </Link>
                  <p className="max-w-md text-sm leading-7 text-[#f7ead4]/75">
                    Premium Kenyan adventures designed with thoughtful routes, warm hosting,
                    trusted logistics, and the kind of moments people remember long after the trip.
                  </p>
                </div>

                <div>
                  <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-[#d8a04a]">
                    Navigate
                  </h4>
                  <ul className="space-y-3 text-sm text-[#f7ead4]/75">
                    {footerLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="transition hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-[#d8a04a]">
                    Experiences
                  </h4>
                  <ul className="space-y-3 text-sm text-[#f7ead4]/75">
                    <li>Mountain and forest hikes</li>
                    <li>Lalanasi lodge trips</li>
                    <li>Camping adventures</li>
                    <li>Coastal getaways</li>
                    <li>WRC Safari Rally trips</li>
                  </ul>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h4 className="mb-4 font-display text-2xl font-semibold">Plan with us</h4>
                  <ul className="space-y-3 text-sm leading-6 text-[#f7ead4]/75">
                    <li>Location: Nairobi, Kenya</li>
                    <li>Phone: +254 118706567</li>
                    <li>Email: info@sunrisetours.co.ke</li>
                    <li>Email: bookingsunrisetours@gmail.com</li>
                  </ul>
                  <Link href="/contact" className="btn-primary mt-6">
                    Start Planning
                  </Link>
                </div>
              </div>

              <div className="soft-divider my-10 opacity-30" />

              <div className="relative flex flex-col gap-3 text-xs text-[#f7ead4]/55 md:flex-row md:items-center md:justify-between">
                <p>Copyright {new Date().getFullYear()} Sunrise Tours & Adventure.</p>
                <p>Curated journeys. Clean logistics. Better stories.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
