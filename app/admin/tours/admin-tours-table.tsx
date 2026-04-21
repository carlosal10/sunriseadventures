'use client';

import Link from 'next/link';
import type { TourRecord } from '../../../lib/domain/tours';
import DeleteTourButton from './delete-tour-button';

type Props = { tours: TourRecord[] };

export default function AdminToursTable({ tours }: Props) {
  return (
    <div className="grid gap-5">
      {tours.map((tour) => (
        <article key={tour.slug} className="premium-card p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr_auto] lg:items-center">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#16372c] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#fffaf1]">
                  {tour.isPublished ? 'Live' : 'Draft'}
                </span>
                {tour.isFeatured && (
                  <span className="rounded-full bg-[#f2dfbf] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#7a451f]">
                    Featured
                  </span>
                )}
              </div>

              <h2 className="font-display text-3xl font-semibold leading-none text-[#21170f]">
                {tour.title}
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#715f4e]">{tour.summary}</p>
            </div>

            <div className="grid gap-2 rounded-[1.35rem] bg-[#fffaf1] p-4 text-sm text-[#715f4e]">
              <p>
                <span className="font-bold text-[#21170f]">Slug:</span> {tour.slug}
              </p>
              <p>
                <span className="font-bold text-[#21170f]">Date:</span>{' '}
                {tour.dateLabel || 'No date set'}
              </p>
              <p>
                <span className="font-bold text-[#21170f]">Price:</span>{' '}
                {tour.priceLabel || 'No price set'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={`/tours/${tour.slug}`} className="btn-secondary px-4 py-2">
                Preview
              </Link>
              <Link href={`/admin/tours/${tour.slug}`} className="btn-primary px-4 py-2">
                Edit
              </Link>
              <DeleteTourButton slug={tour.slug} title={tour.title} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
