'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = { slug: string; title: string };

export default function DeleteTourButton({ slug, title }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${title}"? This removes it from public pages and the API.`)) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/tours/${slug}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        alert(payload.message || 'Failed to delete this tour.');
        return;
      }

      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center justify-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:-translate-y-0.5 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
