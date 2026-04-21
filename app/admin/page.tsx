import Link from 'next/link';
import { listBookings } from '../../lib/data/bookings.repo';
import { listAllToursAdmin } from '../../lib/data/tours.repo';
import { getDatabaseErrorMessage } from '../../lib/db/error-message';

export const dynamic = 'force-dynamic';

export default async function Admin() {
  let tours = [];
  let bookings: any[] = [];
  let loadError = '';

  try {
    const [loadedTours, loadedBookings] = await Promise.all([listAllToursAdmin(), listBookings()]);
    tours = loadedTours;
    bookings = loadedBookings as any[];
  } catch (error) {
    console.error('Failed to load admin dashboard:', error);
    loadError = getDatabaseErrorMessage(error);
  }

  const publishedTours = tours.filter((tour) => tour.isPublished).length;
  const featuredTours = tours.filter((tour) => tour.isFeatured).length;
  const recentBookings = bookings.slice(0, 4);

  return (
    <div className="space-y-8">
      <section className="premium-card overflow-hidden">
        <div className="grid gap-8 bg-[#fffaf1]/70 p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow mb-4">Dynamic admin</p>
            <h1 className="display-title">Keep every page fed from one polished content system.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#715f4e]">
              Tours edited here flow into the home page, listing, detail pages, booking screens,
              and API responses through the shared repository.
            </p>
          </div>

          <Link href="/admin/tours/new" className="btn-primary w-full md:w-auto">
            Add New Tour
          </Link>
        </div>
      </section>

      {loadError && (
        <section className="premium-card border-red-200 bg-red-50 p-6 text-red-800">
          <p className="text-sm font-bold uppercase tracking-[0.18em]">Database attention needed</p>
          <p className="mt-3 leading-7">{loadError}</p>
        </section>
      )}

      <section className="grid gap-5 md:grid-cols-3">
        {[
          ['Total tours', tours.length],
          ['Published tours', publishedTours],
          ['Featured tours', featuredTours],
        ].map(([label, value]) => (
          <div key={label} className="premium-card p-6">
            <p className="eyebrow mb-4">{label}</p>
            <p className="font-display text-5xl font-semibold leading-none text-[#21170f]">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="premium-card p-6 md:p-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">Content health</p>
              <h2 className="font-display text-3xl font-semibold leading-none text-[#21170f]">
                Current tour pipeline
              </h2>
            </div>
            <Link href="/admin/tours" className="btn-secondary px-5 py-2">
              Manage
            </Link>
          </div>

          <div className="space-y-4">
            {tours.slice(0, 5).map((tour) => (
              <div
                key={tour.slug}
                className="flex flex-col gap-3 rounded-[1.35rem] border border-[#21170f]/10 bg-[#fffaf1] p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-display text-2xl font-semibold leading-none text-[#21170f]">
                    {tour.title}
                  </p>
                  <p className="mt-2 text-sm text-[#715f4e]">{tour.dateLabel || 'No date set'}</p>
                </div>
                <span className="w-fit rounded-full bg-[#16372c] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#fffaf1]">
                  {tour.isPublished ? 'Live' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card p-6 md:p-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">Bookings</p>
              <h2 className="font-display text-3xl font-semibold leading-none text-[#21170f]">
                Latest guest requests
              </h2>
            </div>
            <Link href="/admin/bookings" className="btn-secondary px-5 py-2">
              View All
            </Link>
          </div>

          {recentBookings.length > 0 ? (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={String(booking._id ?? `${booking.tourSlug}-${booking.phone}`)}
                  className="rounded-[1.35rem] border border-[#21170f]/10 bg-[#fffaf1] p-4"
                >
                  <p className="font-semibold text-[#21170f]">{booking.name}</p>
                  <p className="mt-1 text-sm text-[#715f4e]">
                    {booking.tourTitle} for {booking.people} guest
                    {Number(booking.people) === 1 ? '' : 's'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.35rem] border border-dashed border-[#21170f]/20 bg-[#fffaf1]/70 p-6 text-[#715f4e]">
              Booking requests will appear here as soon as visitors submit the booking flow.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
