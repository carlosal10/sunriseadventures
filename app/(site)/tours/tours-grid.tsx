import Link from 'next/link';
import Image from 'next/image';
import type { TourRecord } from '../../../lib/domain/tours';
import ToursEmptyState from './tours-empty-state';

type Props = {
  tours: TourRecord[];
};

export default function ToursGrid({ tours }: Props) {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 rounded-[2.5rem] border border-white/70 bg-[#fffaf1]/70 p-6 shadow-[0_24px_80px_rgba(63,41,22,0.1)] md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="eyebrow mb-4">Tour collection</p>
          <h1 className="display-title">Choose the trip that matches your pace.</h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-[#715f4e] lg:justify-self-end">
          A curated calendar of lodge escapes, hikes, group getaways, and event experiences across
          Kenya. Every listing now comes from the live admin-managed database.
        </p>
      </section>

      {tours.length > 0 ? (
        <section className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {tours.map((tour) => (
            <Link key={tour.slug} href={`/tours/${tour.slug}`} className="group">
              <article className="premium-card h-full overflow-hidden">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160f0a]/70 via-transparent to-transparent" />
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#fffaf1]/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#16372c]">
                      {tour.dateLabel}
                    </span>
                    <span className="rounded-full bg-[#16372c]/90 px-4 py-2 text-xs font-bold text-[#fffaf1]">
                      {tour.priceLabel}
                    </span>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <p className="eyebrow mb-3">{tour.location}</p>
                    <h2 className="font-display text-3xl font-semibold leading-none tracking-[-0.035em] text-[#21170f]">
                      {tour.title}
                    </h2>
                  </div>

                  <p className="leading-7 text-[#715f4e]">{tour.summary}</p>

                  <div className="flex items-center justify-between border-t border-[#21170f]/10 pt-5">
                    <span className="text-sm font-bold text-[#b86232]">View itinerary</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f2dfbf] text-[#16372c] transition group-hover:bg-[#16372c] group-hover:text-white">
                      -&gt;
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>
      ) : (
        <ToursEmptyState
          title="No tours are live right now."
          message="The admin team has not published any tours yet, or the database is still being connected."
          actionHref="/contact"
          actionLabel="Plan a Custom Trip"
        />
      )}
    </div>
  );
}
