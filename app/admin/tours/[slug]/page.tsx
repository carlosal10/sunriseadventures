import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTourAdmin } from '../../../../lib/data/tours.repo';
import { getDatabaseErrorMessage } from '../../../../lib/db/error-message';
import TourFormAction from '../tour-form-action';

export const dynamic = 'force-dynamic';

export default async function AdminTourPage({ params }: { params: { slug: string } }) {
  let tour;

  try {
    tour = await getTourAdmin(params.slug);
  } catch (error) {
    console.error('Failed to load admin tour:', error);
    return (
      <div className="space-y-8">
        <section className="premium-card border-red-200 bg-red-50 p-7 text-red-800 md:p-10">
          <Link href="/admin/tours" className="btn-secondary mb-6 px-5 py-2">
            &lt; Back to tours
          </Link>
          <p className="text-sm font-bold uppercase tracking-[0.18em]">
            Database attention needed
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-none tracking-[-0.04em]">
            This tour could not be loaded from MongoDB.
          </h1>
          <p className="mt-5 max-w-2xl leading-7">{getDatabaseErrorMessage(error)}</p>
        </section>
      </div>
    );
  }

  if (!tour) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="premium-card p-7 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/admin/tours" className="btn-secondary mb-6 px-5 py-2">
              &lt; Back to tours
            </Link>
            <p className="eyebrow mb-4">Edit tour</p>
            <h1 className="display-title">{tour.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#715f4e]">
              Changes here update the shared tour record used by the public site, booking flow, and
              API.
            </p>
          </div>

          <Link href={`/tours/${tour.slug}`} className="btn-primary w-full md:w-auto">
            Preview Live Page
          </Link>
        </div>
      </section>

      <TourFormAction mode="edit" initial={tour} />
    </div>
  );
}
