import Link from 'next/link';
import AdminToursTable from './admin-tours-table';
import { listAllToursAdmin } from '../../../lib/data/tours.repo';

export const dynamic = 'force-dynamic';

export default async function AdminToursPage() {
  let tours = [];
  let loadError = false;

  try {
    tours = await listAllToursAdmin();
  } catch (error) {
    loadError = true;
    console.error('Failed to load admin tours:', error);
  }

  return (
    <div className="space-y-8">
      <section className="premium-card p-7 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4">Tour content</p>
            <h1 className="display-title">Manage the trips powering every public page.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#715f4e]">
              Add, edit, feature, draft, or remove tour records from one place. The home page,
              listings, details, booking screens, and `/api/tours` all read from this source.
            </p>
          </div>
          <Link href="/admin/tours/new" className="btn-primary w-full md:w-auto">
            Add New Tour
          </Link>
        </div>
      </section>

      {loadError ? (
        <div className="premium-card border-amber-200 bg-amber-50 p-6 text-amber-900">
          Tours could not be loaded right now. Check the MongoDB connection and try again.
        </div>
      ) : tours.length > 0 ? (
        <AdminToursTable tours={tours} />
      ) : (
        <div className="premium-card border-dashed p-10 text-center">
          <p className="eyebrow mb-4">No tours yet</p>
          <h2 className="font-display text-4xl font-semibold leading-none text-[#21170f]">
            Create the first dynamic trip.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#715f4e]">
            New tours will appear in the admin immediately and can be published into the public
            catalog whenever they are ready.
          </p>
          <Link href="/admin/tours/new" className="btn-primary mt-6">
            Add New Tour
          </Link>
        </div>
      )}
    </div>
  );
}
