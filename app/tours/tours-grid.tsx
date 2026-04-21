import Link from 'next/link';
import Image from 'next/image';
import type { TourRecord } from '../../lib/domain/tours';

type Props = {
  tours: TourRecord[];
};

export default function ToursGrid({ tours }: Props) {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="mb-4 text-4xl font-extrabold">Our Tours</h1>
        <p className="text-lg text-gray-600">
          Explore unforgettable adventures across Kenya with one trusted team.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <Link key={tour.slug} href={`/tours/${tour.slug}`} className="group">
            <article className="overflow-hidden rounded-xl border transition hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={tour.heroImage}
                  alt={tour.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>

              <div className="space-y-3 p-6">
                <div>
                  <h3 className="mb-1 text-xl font-bold transition group-hover:text-orange-600">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-gray-500">{tour.location}</p>
                </div>

                <p className="text-sm text-gray-600">{tour.summary}</p>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <span className="text-sm text-gray-500">{tour.dateLabel}</span>
                  <span className="font-bold text-orange-600">{tour.priceLabel}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
