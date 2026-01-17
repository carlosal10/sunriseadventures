// app/admin/tours/tour-form-action.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  mode: 'create' | 'edit';
  initial?: {
    slug: string;
    title: string;
    short: string;
    description: string;
    price: number;
    durationDays: number;
    published: boolean;
  };
};

export default function TourFormAction({ mode, initial }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: initial?.slug ?? '',
    title: initial?.title ?? '',
    short: initial?.short ?? '',
    description: initial?.description ?? '',
    price: initial?.price.toString() ?? '',
    durationDays: initial?.durationDays.toString() ?? '',
    published: initial?.published ?? false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    const type = (target as HTMLInputElement).type ?? 'text';
    const checked = (target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      short: form.short.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      durationDays: Number(form.durationDays),
      published: form.published,
    };

    const url = mode === 'create' ? '/api/admin/tours' : `/api/admin/tours/${initial?.slug}`;

    const method = mode === 'create' ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/tours');
    } else {
      const { message } = await res.json().catch(() => ({}));
      alert(message || 'Failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block font-medium">Slug</label>
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
          disabled={mode === 'edit'}
        />
      </div>
      <div>
        <label className="block font-medium">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-medium">Short description</label>
        <input
          name="short"
          value={form.short}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-medium">Full description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
          rows={4}
        />
      </div>
      <div>
        <label className="block font-medium">Price USD</label>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          type="number"
          min="0"
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-medium">Duration days</label>
        <input
          name="durationDays"
          value={form.durationDays}
          onChange={handleChange}
          required
          type="number"
          min="1"
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input name="published" type="checkbox" checked={form.published} onChange={handleChange} />
        <label>Published</label>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {mode === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  );
}
