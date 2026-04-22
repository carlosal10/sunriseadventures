import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getTour } from '../../../../lib/data/tours.repo';
import TourDetailsView from './tour-details-view';

export const dynamic = 'force-dynamic';

export default async function TourDetails({ params }: { params: { slug: string } }) {
  let tour = null;

  try {
    tour = await getTour(params.slug);
  } catch (error) {
    console.error('Failed to load live tour details:', error);

    return (
      <div className="space-y-10">
        <section className="premium-card border-red-200 bg-red-50 p-8 text-red-800 md:p-10">
          <p className="eyebrow mb-4 text-red-700">Tour details unavailable</p>
          <h1 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em]">
            We could not load this tour right now.
          </h1>
          <p className="mt-5 max-w-2xl leading-7">
            The live tour database is temporarily unavailable. Please try again shortly or contact
            the team directly.
          </p>
          <Link href="/contact" className="btn-primary mt-6">
            Contact the Team
          </Link>
        </section>
      </div>
    );
  }

  if (!tour) {
    notFound();
  }

  if (tour.slug !== params.slug) {
    redirect(`/tours/${tour.slug}`);
  }

  return <TourDetailsView tour={tour} />;
}
