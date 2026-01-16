// app/admin/tours/admin-tours-table.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import DeleteTourButton from './delete-tour-button';

type Tour = {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  price: number;
  durationDays: number;
  published: boolean;
};

type Props = { tours: Tour[] };

export default function AdminToursTable({ tours }: Props) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-2 py-1 text-left">Title</th>
          <th className="border px-2 py-1 text-left">Slug</th>
          <th className="border px-2 py-1 text-left">Price</th>
          <th className="border px-2 py-1 text-left">Duration</th>
          <th className="border px-2 py-1 text-left">Published</th>
          <th className="border px-2 py-1 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tours.map((t) => (
          <tr key={t._id || t.id}>
            <td className="border px-2 py-1">{t.title}</td>
            <td className="border px-2 py-1">{t.slug}</td>
            <td className="border px-2 py-1">${t.price}</td>
            <td className="border px-2 py-1">{t.durationDays} days</td>
            <td className="border px-2 py-1">{t.published ? 'Yes' : 'No'}</td>
            <td className="border px-2 py-1 space-x-2">
              <Link href={`/admin/tours/${t.slug}`} className="text-blue-600">
                Edit
              </Link>
              <DeleteTourButton slug={t.slug} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
