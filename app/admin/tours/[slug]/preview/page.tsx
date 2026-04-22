import Link from 'next/link';
import { notFound } from 'next/navigation';
import TourDetailsView from '../../../../(site)/tours/[slug]/tour-details-view';
import { getTourAdmin } from '../../../../../lib/data/tours.repo';
import { getDatabaseErrorMessage } from '../../../../../lib/db/error-message';

export const dynamic = 'force-dynamic';

export default async function AdminTourPreviewPage({ params }: { params: { slug: string } }) {
  let tour = null;

  try {
    tour = await getTourAdmin(params.slug);
  } catch (error) {
    console.error('Failed to load admin preview:', error);

    return (
      <section className="premium-card border-red-200 bg-red-50 p-8 text-red-800 md:p-10">
        <Link href="/admin/tours" className="btn-secondary mb-6 px-5 py-2">
          &lt; Back to admin tours
        </Link>
        <p className="text-sm font-bold uppercase tracking-[0.18em]">Preview unavailable</p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-none tracking-[-0.04em]">
          We could not load this admin preview right now.
        </h1>
        <p className="mt-5 max-w-2xl leading-7">{getDatabaseErrorMessage(error)}</p>
      </section>
    );
  }

  if (!tour) {
    notFound();
  }

  return (
    <div className="section-shell py-8 md:py-12">
      <div className="mb-8 flex flex-wrap gap-3">
        <Link href="/admin/tours" className="btn-secondary px-5 py-2">
          &lt; Back to admin tours
        </Link>
        <Link href={`/admin/tours/${tour.slug}`} className="btn-primary px-5 py-2">
          Edit This Tour
        </Link>
      </div>

      <TourDetailsView
        tour={tour}
        previewLabel={tour.isPublished ? 'Admin preview - live tour' : 'Admin preview - draft'}
      />
    </div>
  );
}
