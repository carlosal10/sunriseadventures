import Link from 'next/link';
import Image from 'next/image';
import type { TourRecord } from '../../../../lib/domain/tours';
import { getOptimizedImageUrl } from '../../../../lib/images/cloudinary';
import TourGallery from './tour-gallery';

type Props = {
  tour: TourRecord;
  previewLabel?: string;
};

export default function TourDetailsView({ tour, previewLabel }: Props) {
  return (
    <div className="space-y-16">
      <section className="relative h-[74vh] min-h-[620px] overflow-hidden rounded-[2.5rem] border border-white/60 shadow-[0_30px_90px_rgba(63,41,22,0.18)]">
        <Image
          src={getOptimizedImageUrl(tour.heroImage)}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#160f0a]/88 via-[#160f0a]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#160f0a]/70 to-transparent" />

        <div className="relative z-10 flex h-full items-end p-6 md:p-12">
          <div className="max-w-4xl">
            <Link
              href="/tours"
              className="mb-8 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-[#fffaf1] backdrop-blur transition hover:bg-white/20"
            >
              &lt; Back to tours
            </Link>
            {previewLabel && (
              <p className="mb-4 inline-flex rounded-full bg-[#fffaf1]/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#16372c]">
                {previewLabel}
              </p>
            )}
            <p className="eyebrow mb-4 text-[#f0bd6b]">{tour.location}</p>
            <h1 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-[#fffaf1] md:text-7xl">
              {tour.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{tour.summary}</p>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-20 hidden rounded-[2rem] border border-white/20 bg-white/15 p-5 text-[#fffaf1] backdrop-blur md:block">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f0bd6b]">From</p>
          <p className="mt-1 font-display text-3xl font-semibold">{tour.priceLabel}</p>
          <p className="mt-2 text-sm text-white/70">{tour.dateLabel}</p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_23rem]">
        <div className="premium-card p-7 md:p-10">
          <p className="eyebrow mb-3">Overview</p>
          <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-[#21170f]">
            A thoughtfully hosted day out.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#715f4e]">{tour.description}</p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-display text-2xl font-semibold text-[#21170f]">
                Highlights
              </h3>
              <ul className="space-y-3 text-[#715f4e]">
                {tour.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b86232]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-7">
              <div>
                <h3 className="mb-4 font-display text-2xl font-semibold text-[#21170f]">
                  What&apos;s Included
                </h3>
                <ul className="space-y-3 text-[#715f4e]">
                  {tour.includes.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-display text-2xl font-semibold text-[#21170f]">
                  What&apos;s Not Included
                </h3>
                <ul className="space-y-3 text-[#715f4e]">
                  {tour.excludes.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <aside className="premium-card h-fit p-6">
          <p className="eyebrow mb-5">Reservation</p>
          <div className="space-y-4 rounded-[1.5rem] bg-[#16372c] p-5 text-[#fffaf1]">
            <p className="flex justify-between gap-4 text-sm">
              <span className="text-white/60">Date</span>
              <span className="text-right font-semibold">{tour.dateLabel}</span>
            </p>
            <p className="flex justify-between gap-4 text-sm">
              <span className="text-white/60">Location</span>
              <span className="text-right font-semibold">{tour.location}</span>
            </p>
            <p className="flex justify-between gap-4 text-sm">
              <span className="text-white/60">Price</span>
              <span className="text-right font-semibold text-[#f0bd6b]">{tour.priceLabel}</span>
            </p>
          </div>

          <Link href={`/tours/${tour.slug}/book`} className="btn-primary mt-5 w-full">
            Book This Tour
          </Link>
          <p className="mt-4 text-center text-xs leading-5 text-[#715f4e]">
            Your booking request is saved first, then WhatsApp opens for quick confirmation.
          </p>
        </aside>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Visual itinerary</p>
            <h2 className="display-title">Photo highlights.</h2>
          </div>
          <p className="max-w-md leading-7 text-[#715f4e]">
            A quick look at the kind of scenery, movement, and atmosphere to expect on this trip.
          </p>
        </div>
        <TourGallery images={tour.gallery} title={tour.title} />
      </section>

      <section className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="premium-card p-7">
          <p className="eyebrow mb-4">Availability</p>
          <div className="grid gap-4">
            {tour.availability.map((availability) => (
              <div
                key={availability.date}
                className="rounded-[1.35rem] border border-[#21170f]/10 bg-[#fffaf1] p-4"
              >
                <p className="font-display text-2xl font-semibold">{availability.date}</p>
                <p className="text-sm font-bold text-[#b86232]">{availability.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-[#21170f]/10 shadow-[0_20px_60px_rgba(63,41,22,0.1)]">
          <iframe
            title={`Map for ${tour.title}`}
            src={tour.mapEmbed}
            className="h-[24rem] w-full"
            loading="lazy"
          />
        </div>
      </section>

      {tour.testimonials.length > 0 && (
        <section>
          <p className="eyebrow mb-4">Traveler notes</p>
          <div className="grid gap-5 md:grid-cols-2">
            {tour.testimonials.map((testimonial, index) => (
              <blockquote
                key={`${testimonial.name ?? 'traveler'}-${index}`}
                className="premium-card p-7"
              >
                <p className="font-display text-3xl font-semibold leading-tight text-[#21170f]">
                  &quot;{testimonial.text}&quot;
                </p>
                {testimonial.name && (
                  <footer className="mt-5 text-sm font-bold text-[#b86232]">
                    {testimonial.name}
                  </footer>
                )}
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
