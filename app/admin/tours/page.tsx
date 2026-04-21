import React from 'react';
import Link from 'next/link';
import { listAllToursAdmin } from '../../../lib/data/tours.repo';

export const dynamic = 'force-dynamic';

type Tour = {
  id: string;
  title: string;
  isPublished?: boolean;
  published?: boolean;
};

function AdminToursTable({ tours }: { tours: Tour[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 text-left">Title</th>
            <th className="py-2 text-left">Published</th>
            <th className="py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id} className="border-t">
              <td className="py-2">{tour.title}</td>
              <td className="py-2">{tour.isPublished ?? tour.published ? 'Yes' : 'No'}</td>
              <td className="py-2 text-right">
                <Link href={`/admin/tours/${tour.id}`} className="text-blue-600">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function AdminToursPage() {
  let tours: Tour[] = [];
  let loadError = false;

  try {
    const rawTours = await listAllToursAdmin();
    tours = (rawTours as any[]).map((tour) => ({
      id: (tour._id ?? tour.id ?? '').toString(),
      title: tour.title ?? '',
      isPublished: Boolean(tour.isPublished ?? tour.published),
      published: Boolean(tour.isPublished ?? tour.published),
    }));
  } catch (error) {
    loadError = true;
    console.error('Failed to load admin tours:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tours</h1>
        <Link href="/admin/tours/new" className="rounded bg-blue-600 px-4 py-2 text-white">
          + New tour
        </Link>
      </div>

      {loadError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
          Tours could not be loaded right now. Check the MongoDB connection and try again.
        </div>
      ) : tours.length > 0 ? (
        <AdminToursTable tours={tours} />
      ) : (
        <div className="rounded-lg border border-dashed p-6 text-gray-600">
          No tours have been added yet.
        </div>
      )}
    </div>
  );
}
