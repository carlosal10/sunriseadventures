// app/admin/tours/delete-tour-button.tsx
'use client';

import { useRouter } from 'next/navigation';

type Props = { slug: string };

export default function DeleteTourButton({ slug }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Delete this tour?')) return;
    const res = await fetch(`/api/admin/tours/${slug}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.refresh();
    } else {
      alert('Failed to delete');
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
}
