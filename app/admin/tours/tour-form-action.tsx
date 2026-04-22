'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { TourRecord } from '../../../lib/domain/tours';

type Props = {
  mode: 'create' | 'edit';
  initial?: TourRecord;
};

type FeedbackState = {
  kind: 'error' | 'success';
  message: string;
} | null;

type UploadTarget = 'hero' | 'gallery';

function joinLines(items?: string[]) {
  return items?.join('\n') ?? '';
}

function parseLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringifyAvailability(tour?: TourRecord) {
  return tour?.availability.map((item) => `${item.date} | ${item.status}`).join('\n') ?? '';
}

function parseAvailability(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => {
      const [date, status] = line.split('|').map((part) => part.trim());
      if (!date) return null;
      return { date, status: status || 'Available' };
    })
    .filter(Boolean);
}

function createInitialState(initial?: TourRecord) {
  return {
    slug: initial?.slug ?? '',
    title: initial?.title ?? '',
    short: initial?.short ?? '',
    summary: initial?.summary ?? '',
    description: initial?.description ?? '',
    heroImage: initial?.heroImage ?? '/images/tour-island.jpg',
    gallery: joinLines(initial?.gallery),
    dateLabel: initial?.dateLabel ?? '',
    location: initial?.location ?? '',
    priceValue: initial?.priceValue ? String(initial.priceValue) : '',
    priceLabel: initial?.priceLabel ?? '',
    mapEmbed: initial?.mapEmbed ?? '',
    highlights: joinLines(initial?.highlights),
    includes: joinLines(initial?.includes),
    excludes: joinLines(initial?.excludes),
    availability: stringifyAvailability(initial),
    whatsappNumber: initial?.whatsappNumber ?? '254118706567',
    featuredOrder: initial?.featuredOrder ? String(initial.featuredOrder) : '999',
    isFeatured: initial?.isFeatured ?? false,
    isPublished: initial?.isPublished ?? true,
  };
}

export default function TourFormAction({ mode, initial }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(() => createInitialState(initial));
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingTarget, setUploadingTarget] = useState<UploadTarget | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setForm((current) => ({ ...current, [name]: target.checked }));
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    target: UploadTarget
  ) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';

    if (!file) return;

    setUploadingTarget(target);
    setFeedback(null);

    const body = new FormData();
    body.append('file', file);

    try {
      const response = await fetch('/api/admin/uploads', {
        method: 'POST',
        body,
      });
      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
        url?: string;
      };

      if (!response.ok || !payload.url) {
        setFeedback({
          kind: 'error',
          message: payload.message || 'Image upload failed.',
        });
        return;
      }

      const uploadedUrl = payload.url;

      setForm((current) => {
        const galleryItems = parseLines(current.gallery);
        const gallery = galleryItems.includes(uploadedUrl)
          ? current.gallery
          : [...galleryItems, uploadedUrl].join('\n');

        if (target === 'hero') {
          return {
            ...current,
            heroImage: uploadedUrl,
            gallery,
          };
        }

        return {
          ...current,
          gallery,
        };
      });

      setFeedback({
        kind: 'success',
        message:
          target === 'hero'
            ? 'Hero image uploaded and added to the gallery.'
            : 'Gallery image uploaded.',
      });
    } catch (error) {
      console.error(error);
      setFeedback({ kind: 'error', message: 'Image upload failed.' });
    } finally {
      setUploadingTarget(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.slug.trim() || !form.title.trim() || !form.description.trim() || !form.location.trim()) {
      setFeedback({
        kind: 'error',
        message: 'Slug, title, location, and description are required.',
      });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      short: form.short.trim(),
      summary: form.summary.trim(),
      description: form.description.trim(),
      heroImage: form.heroImage.trim(),
      gallery: parseLines(form.gallery),
      dateLabel: form.dateLabel.trim(),
      location: form.location.trim(),
      priceValue: Number(form.priceValue),
      priceLabel: form.priceLabel.trim(),
      mapEmbed: form.mapEmbed.trim(),
      highlights: parseLines(form.highlights),
      includes: parseLines(form.includes),
      excludes: parseLines(form.excludes),
      availability: parseAvailability(form.availability),
      whatsappNumber: form.whatsappNumber.trim(),
      featuredOrder: Number(form.featuredOrder),
      isFeatured: form.isFeatured,
      isPublished: form.isPublished,
    };

    const url = mode === 'create' ? '/api/admin/tours' : `/api/admin/tours/${initial?.slug}`;
    const method = mode === 'create' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const response = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFeedback({
          kind: 'error',
          message: response.message || 'Failed to save this tour.',
        });
        return;
      }

      setFeedback({
        kind: 'success',
        message: mode === 'create' ? 'Tour created.' : 'Tour updated.',
      });
      router.push('/admin/tours');
      router.refresh();
    } catch (error) {
      console.error(error);
      setFeedback({ kind: 'error', message: 'Failed to save this tour.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <section className="premium-card p-6 md:p-8">
        <p className="eyebrow mb-5">Core story</p>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Slug</span>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              disabled={mode === 'edit'}
              className="form-control disabled:bg-[#f2dfbf]/50"
              placeholder="tigoni-experience"
            />
            <span className="block text-xs text-[#715f4e]">
              Clean URL slugs are normalized automatically when you save.
            </span>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Title</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Tigoni Experience"
            />
          </label>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Short card copy</span>
            <input
              name="short"
              value={form.short}
              onChange={handleChange}
              className="form-control"
              placeholder="A countryside reset with easy adventure."
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Summary</span>
            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              className="form-control"
              placeholder="One polished sentence for listings and details."
            />
          </label>
        </div>

        <label className="mt-5 block space-y-2">
          <span className="text-sm font-bold text-[#21170f]">Full description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={6}
            className="form-control"
            placeholder="Describe the experience, mood, logistics, and what guests should expect."
          />
        </label>
      </section>

      <section className="premium-card p-6 md:p-8">
        <p className="eyebrow mb-5">Logistics</p>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Location</span>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Tigoni, Limuru"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Date label</span>
            <input
              name="dateLabel"
              value={form.dateLabel}
              onChange={handleChange}
              className="form-control"
              placeholder="24 Jan 2026"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Price value</span>
            <input
              name="priceValue"
              value={form.priceValue}
              onChange={handleChange}
              type="number"
              min="0"
              className="form-control"
              placeholder="2800"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Price label</span>
            <input
              name="priceLabel"
              value={form.priceLabel}
              onChange={handleChange}
              className="form-control"
              placeholder="From KES 2,800"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">WhatsApp number</span>
            <input
              name="whatsappNumber"
              value={form.whatsappNumber}
              onChange={handleChange}
              className="form-control"
              placeholder="254118706567"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Featured order</span>
            <input
              name="featuredOrder"
              value={form.featuredOrder}
              onChange={handleChange}
              type="number"
              min="1"
              className="form-control"
            />
          </label>
        </div>

        <label className="mt-5 block space-y-2">
          <span className="text-sm font-bold text-[#21170f]">Map embed URL</span>
          <input
            name="mapEmbed"
            value={form.mapEmbed}
            onChange={handleChange}
            className="form-control"
            placeholder="https://www.google.com/maps?q=Tigoni%20Limuru&output=embed"
          />
        </label>

        <div className="mt-6 flex flex-wrap gap-4">
          <label className="flex items-center gap-3 rounded-full border border-[#21170f]/10 bg-[#fffaf1] px-4 py-3 text-sm font-bold text-[#21170f]">
            <input
              name="isPublished"
              type="checkbox"
              checked={form.isPublished}
              onChange={handleChange}
            />
            Published
          </label>

          <label className="flex items-center gap-3 rounded-full border border-[#21170f]/10 bg-[#fffaf1] px-4 py-3 text-sm font-bold text-[#21170f]">
            <input
              name="isFeatured"
              type="checkbox"
              checked={form.isFeatured}
              onChange={handleChange}
            />
            Featured on home page
          </label>
        </div>
      </section>

      <section className="premium-card p-6 md:p-8">
        <p className="eyebrow mb-5">Media and itinerary</p>
        <div className="space-y-3">
          <label className="block space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Hero image</span>
            <input
              name="heroImage"
              value={form.heroImage}
              onChange={handleChange}
              className="form-control"
              placeholder="/images/tigoni/1.jpg"
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="btn-secondary cursor-pointer px-5 py-2">
              {uploadingTarget === 'hero' ? 'Uploading hero...' : 'Upload Hero Image'}
              <input
                type="file"
                accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => handleImageUpload(event, 'hero')}
                disabled={uploadingTarget !== null}
              />
            </label>

            {form.heroImage && (
              <a
                href={form.heroImage}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-[#b86232] transition hover:text-[#16372c]"
              >
                Preview current hero image
              </a>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-bold text-[#21170f]">Gallery images</span>
              <label className="btn-secondary cursor-pointer px-4 py-2">
                {uploadingTarget === 'gallery' ? 'Uploading...' : 'Upload Gallery Image'}
                <input
                  type="file"
                  accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={(event) => handleImageUpload(event, 'gallery')}
                  disabled={uploadingTarget !== null}
                />
              </label>
            </div>
            <textarea
              name="gallery"
              value={form.gallery}
              onChange={handleChange}
              rows={7}
              className="form-control"
              placeholder="/images/tigoni/1.jpg"
            />
            <span className="block text-xs text-[#715f4e]">
              Upload images or paste paths manually. One image path per line.
            </span>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Availability</span>
            <textarea
              name="availability"
              value={form.availability}
              onChange={handleChange}
              rows={7}
              className="form-control"
              placeholder="24 Jan 2026 | Available"
            />
            <span className="block text-xs text-[#715f4e]">Use: date | status.</span>
          </label>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Highlights</span>
            <textarea
              name="highlights"
              value={form.highlights}
              onChange={handleChange}
              rows={8}
              className="form-control"
              placeholder="Guided hike"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Includes</span>
            <textarea
              name="includes"
              value={form.includes}
              onChange={handleChange}
              rows={8}
              className="form-control"
              placeholder="Return transport"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-bold text-[#21170f]">Excludes</span>
            <textarea
              name="excludes"
              value={form.excludes}
              onChange={handleChange}
              rows={8}
              className="form-control"
              placeholder="Personal expenses"
            />
          </label>
        </div>
      </section>

      {feedback && (
        <div
          className={`rounded-2xl px-5 py-4 text-sm font-semibold ${
            feedback.kind === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={isSaving} className="btn-primary disabled:opacity-60">
          {isSaving ? 'Saving...' : mode === 'create' ? 'Create Tour' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/tours')}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
