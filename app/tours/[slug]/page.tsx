import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPublishedTourBySlug } from '../../../lib/domain/tours';
import TourGallery from './tour-gallery';

export default function TourDetails({ params }: { params: { slug: string } }) {
  const tour = getPublishedTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="space-y-16">
      <section className="relative h-[60vh] overflow-hidden rounded-2xl">
        <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-end p-8">
          <div>
            <Link href="/tours" className="mb-4 inline-block text-sm text-orange-200">
              &lt; Back to tours
            </Link>
            <h1 className="text-4xl font-extrabold text-white md:text-5xl">{tour.title}</h1>
            <p className="mt-2 text-gray-200">
              {tour.location} | {tour.dateLabel}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-10 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tour Overview</h2>
            <p className="text-gray-700">{tour.description}</p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Highlights</h3>
            <ul className="space-y-2 text-gray-700">
              {tour.highlights.map((highlight) => (
                <li key={highlight}>- {highlight}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold">What&apos;s Included</h3>
              <ul className="space-y-2 text-gray-700">
                {tour.includes.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">What&apos;s Not Included</h3>
              <ul className="space-y-2 text-gray-700">
                {tour.excludes.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="h-fit space-y-4 rounded-xl border p-6">
          <div className="space-y-3">
            <p className="flex justify-between gap-4">
              <span>Date</span>
              <span className="text-right font-semibold">{tour.dateLabel}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Location</span>
              <span className="text-right font-semibold">{tour.location}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Price</span>
              <span className="text-right font-bold text-orange-600">{tour.priceLabel}</span>
            </p>
          </div>

          <Link
            href={`/tours/${tour.slug}/book`}
            className="block rounded-lg bg-orange-600 py-3 text-center font-semibold text-white transition hover:bg-orange-700"
          >
            Book This Tour
          </Link>
        </aside>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Photo Highlights</h2>
        <TourGallery images={tour.gallery} title={tour.title} />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Availability</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {tour.availability.map((availability) => (
            <div key={availability.date} className="rounded-xl border p-4">
              <p className="font-semibold">{availability.date}</p>
              <p className="text-sm text-gray-600">{availability.status}</p>
            </div>
          ))}
        </div>
      </section>

      {tour.testimonials.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold">Traveler Notes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tour.testimonials.map((testimonial, index) => (
              <blockquote
                key={`${testimonial.name ?? 'traveler'}-${index}`}
                className="rounded-xl border p-5"
              >
                <p className="text-gray-700">&quot;{testimonial.text}&quot;</p>
                {testimonial.name && (
                  <footer className="mt-3 text-sm font-semibold text-orange-600">
                    {testimonial.name}
                  </footer>
                )}
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl font-bold">Location</h2>
        <iframe
          title={`Map for ${tour.title}`}
          src={tour.mapEmbed}
          className="h-96 w-full rounded-xl border"
          loading="lazy"
        />
      </section>
    </div>
  );
}
