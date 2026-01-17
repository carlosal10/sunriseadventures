// Admin tour edit page

import React from 'react'
import Link from 'next/link'
import { listAllToursAdmin } from '../../../../lib/data/tours.repo'

export default async function AdminTourPage({ params }: { params: { slug: string } }) {
  const all = await listAllToursAdmin()
  const tour: any = (all as any[]).find(
    (t) => (t.slug ?? t._id ?? t.id ?? '').toString() === params.slug
  )

  if (!tour) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Tour not found</h2>
        <Link href="/admin/tours" className="text-blue-600 mt-4 inline-block">
          ← Back to tours
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Edit: {tour.title}</h1>
        <Link href="/admin/tours" className="text-sm text-gray-600">
          Back
        </Link>
      </div>

      <div className="border rounded p-4">
        <p className="mb-2"><strong>Slug:</strong> {tour.slug ?? tour._id ?? tour.id}</p>
        <p className="mb-2"><strong>Published:</strong> {tour.published ? 'Yes' : 'No'}</p>
        <p className="mb-2"><strong>Short:</strong> {tour.short ?? ''}</p>
        <p className="mb-2"><strong>Price:</strong> {tour.price ?? ''}</p>
      </div>
    </div>
  )
}
