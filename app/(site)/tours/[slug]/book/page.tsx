import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getTour } from '../../../../../lib/data/tours.repo';
import BookTourForm from './book-tour-form';

export const dynamic = 'force-dynamic';

export default async function BookTourPage({ params }: { params: { slug: string } }) {
  let tour = null;

  try {
    tour = await getTour(params.slug);
  } catch (error) {
    console.error('Failed to load booking page:', error);

    return (
      <section className="premium-card border-red-200 bg-red-50 p-8 text-red-800 md:p-10">
        <p className="eyebrow mb-4 text-red-700">Booking unavailable</p>
        <h1 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em]">
          We could not load this booking page right now.
        </h1>
        <p className="mt-5 max-w-2xl leading-7">
          The live tour database is temporarily unavailable. Please try again shortly or contact
          the team directly so we can help.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-primary">
            Contact the Team
          </Link>
          <Link href="/tours" className="btn-secondary">
            Back to Tours
          </Link>
        </div>
      </section>
    );
  }

  if (!tour) {
    notFound();
  }

  if (tour.slug !== params.slug) {
    redirect(`/tours/${tour.slug}/book`);
  }

  return (
    <div className="grid gap-8 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
      <aside className="premium-card overflow-hidden">
        <div className="relative h-80">
          <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160f0a]/70 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-[#fffaf1]">
            <p className="eyebrow mb-3 text-[#f0bd6b]">Booking request</p>
            <h1 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em]">
              {tour.title}
            </h1>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {[
            ['Date', tour.dateLabel],
            ['Location', tour.location],
            ['Price', tour.priceLabel],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-b border-[#21170f]/10 pb-4">
              <span className="text-sm font-semibold text-[#715f4e]">{label}</span>
              <span className="text-right font-bold text-[#21170f]">{value}</span>
            </div>
          ))}
          <p className="pt-2 text-sm leading-6 text-[#715f4e]">
            We save the request first, then open WhatsApp so our team can confirm availability,
            payment details, and pickup plans.
          </p>
        </div>
      </aside>

      <section className="premium-card p-6 md:p-10">
        <p className="eyebrow mb-4">Secure your spot</p>
        <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-[#21170f] md:text-5xl">
          Tell us who is joining.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-[#715f4e]">
          Keep it simple. Once submitted, your details are logged and the WhatsApp message is
          prepared automatically.
        </p>

        <div className="mt-8">
          <BookTourForm
            tour={{
              slug: tour.slug,
              title: tour.title,
              dateLabel: tour.dateLabel,
              priceLabel: tour.priceLabel,
              whatsappNumber: tour.whatsappNumber,
            }}
          />
        </div>
      </section>
    </div>
  );
}
