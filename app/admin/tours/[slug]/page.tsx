import React from 'react';
import Link from 'next/link';
import { listAllToursAdmin } from '../../../../lib/data/tours.repo';

export const dynamic = 'force-dynamic';

export default async function AdminTourPage({ params }: { params: { slug: string } }) {
  let allTours: any[] = [];
  let loadError = false;

  try {
    allTours = (await listAllToursAdmin()) as any[];
  } catch (error) {
    loadError = true;
    console.error('Failed to load admin tour:', error);
  }

  if (loadError) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Admin data is unavailable</h2>
        <p className="mt-2 text-gray-600">Check the MongoDB connection, then reload this page.</p>
        <Link href="/admin/tours" className="mt-4 inline-block text-blue-600">
          Back to tours
        </Link>
      </div>
    );
  }

  const tour = allTours.find(
    (item) => (item.slug ?? item._id ?? item.id ?? '').toString() === params.slug
  );

  if (!tour) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Tour not found</h2>
        <Link href="/admin/tours" className="mt-4 inline-block text-blue-600">
          &lt; Back to tours
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit: {tour.title}</h1>
        <Link href="/admin/tours" className="text-sm text-gray-600">
          Back
        </Link>
      </div>

      <div className="rounded border p-4">
        <p className="mb-2">
          <strong>Slug:</strong> {tour.slug ?? tour._id ?? tour.id}
        </p>
        <p className="mb-2">
          <strong>Published:</strong> {tour.isPublished ?? tour.published ? 'Yes' : 'No'}
        </p>
        <p className="mb-2">
          <strong>Short:</strong> {tour.short ?? ''}
        </p>
        <p className="mb-2">
          <strong>Price:</strong> {tour.priceLabel ?? tour.price ?? ''}
        </p>
      </div>
    </div>
  );
}
