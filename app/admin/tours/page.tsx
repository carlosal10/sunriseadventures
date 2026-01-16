// app/admin/tours/page.tsx

import React from 'react';
import Link from 'next/link';
import { listAllToursAdmin } from '../../../lib/data/tours.repo';

type Tour = {
  id: string;
  title: string;
  published?: boolean;
};

function AdminToursTable({ tours }: { tours: Tour[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left py-2">Title</th>
            <th className="text-left py-2">Published</th>
            <th className="text-right py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="py-2">{t.title}</td>
              <td className="py-2">{t.published ? 'Yes' : 'No'}</td>
              <td className="py-2 text-right">
                <Link href={`/admin/tours/${t.id}`} className="text-blue-600">
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
  const rawTours = await listAllToursAdmin();
  const tours: Tour[] = (rawTours as any[]).map((t) => ({
    id: (t._id ?? t.id ?? '').toString(),
    title: t.title ?? '',
    published: Boolean(t.published),
  }));
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tours</h1>
        <Link href="/admin/tours/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          + New tour
        </Link>
      </div>
      <AdminToursTable tours={tours} />
    </div>
  );
}
