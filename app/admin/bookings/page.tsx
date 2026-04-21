import Link from 'next/link';
import { listBookings } from '../../../lib/data/bookings.repo';

export const dynamic = 'force-dynamic';

function formatDate(value: unknown) {
  if (!value) return 'No date recorded';

  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return 'No date recorded';

  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export default async function AdminBookingsPage() {
  const bookings = (await listBookings()) as any[];

  return (
    <div className="space-y-8">
      <section className="premium-card p-7 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4">Booking desk</p>
            <h1 className="display-title">Guest requests captured from the live booking flow.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#715f4e]">
              Every submitted booking is saved before WhatsApp opens, so the team has a reliable
              record of demand even when the conversation continues elsewhere.
            </p>
          </div>
          <Link href="/admin/tours" className="btn-secondary w-full md:w-auto">
            Manage Tours
          </Link>
        </div>
      </section>

      {bookings.length > 0 ? (
        <section className="grid gap-5">
          {bookings.map((booking) => (
            <article
              key={String(booking._id ?? `${booking.tourSlug}-${booking.phone}`)}
              className="premium-card p-6"
            >
              <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr_auto] lg:items-center">
                <div>
                  <p className="eyebrow mb-3">{booking.status ?? 'pending'}</p>
                  <h2 className="font-display text-3xl font-semibold leading-none text-[#21170f]">
                    {booking.name}
                  </h2>
                  <p className="mt-3 text-[#715f4e]">{booking.tourTitle}</p>
                </div>

                <div className="grid gap-2 text-sm text-[#715f4e]">
                  <p>
                    <span className="font-bold text-[#21170f]">Phone:</span> {booking.phone}
                  </p>
                  <p>
                    <span className="font-bold text-[#21170f]">Email:</span>{' '}
                    {booking.email || 'Not provided'}
                  </p>
                  <p>
                    <span className="font-bold text-[#21170f]">Guests:</span> {booking.people}
                  </p>
                </div>

                <div className="rounded-[1.35rem] bg-[#16372c] p-4 text-sm text-[#fffaf1]">
                  <p className="text-white/60">Submitted</p>
                  <p className="mt-1 font-semibold">{formatDate(booking.createdAt)}</p>
                </div>
              </div>

              {booking.message && (
                <p className="mt-5 rounded-[1.35rem] bg-[#fffaf1] p-4 leading-7 text-[#715f4e]">
                  {booking.message}
                </p>
              )}
            </article>
          ))}
        </section>
      ) : (
        <section className="premium-card border-dashed p-10 text-center">
          <p className="eyebrow mb-4">Nothing yet</p>
          <h2 className="font-display text-4xl font-semibold leading-none text-[#21170f]">
            Booking requests will land here.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#715f4e]">
            Once a visitor submits a tour booking, the record appears here and the WhatsApp handoff
            still happens immediately for confirmation.
          </p>
        </section>
      )}
    </div>
  );
}
