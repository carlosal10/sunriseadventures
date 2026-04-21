import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', note: 'Studio overview' },
  { href: '/admin/tours', label: 'Tours', note: 'Trips and content' },
  { href: '/admin/bookings', label: 'Bookings', note: 'Guest requests' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="section-shell grid gap-6 py-8 md:py-12 lg:grid-cols-[18rem_1fr]">
      <aside className="premium-card h-fit overflow-hidden">
        <div className="bg-[#16372c] p-6 text-[#fffaf1]">
          <p className="eyebrow mb-3 text-[#d8a04a]">Admin studio</p>
          <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em]">
            Sunrise control room.
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Manage dynamic trips, bookings, and future content without breaking the premium front
            end.
          </p>
        </div>

        <nav className="space-y-3 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-[1.35rem] border border-[#21170f]/10 bg-[#fffaf1]/70 p-4 transition hover:-translate-y-0.5 hover:border-[#b86232]/30 hover:bg-white"
            >
              <span className="block font-display text-2xl font-semibold leading-none text-[#21170f]">
                {item.label}
              </span>
              <span className="mt-2 block text-sm text-[#715f4e]">{item.note}</span>
            </Link>
          ))}

          <form action="/api/auth/logout" method="post">
            <button type="submit" className="btn-secondary mt-2 w-full">
              Sign Out
            </button>
          </form>
        </nav>
      </aside>

      <main className="min-w-0">{children}</main>
    </div>
  );
}
