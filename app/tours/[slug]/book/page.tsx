import { notFound } from 'next/navigation';
import { getPublishedTourBySlug } from '../../../../lib/domain/tours';
import BookTourForm from './book-tour-form';

export default function BookTourPage({ params }: { params: { slug: string } }) {
  const tour = getPublishedTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-14">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Book {tour.title}</h1>
        <p className="text-gray-600">
          Share your details below and we will save your booking request before opening WhatsApp to
          continue the conversation.
        </p>
      </div>

      <div className="rounded-2xl border bg-orange-50/50 p-5 text-sm text-gray-700">
        <p className="font-semibold text-gray-900">{tour.title}</p>
        <p>{tour.location}</p>
        <p>
          {tour.dateLabel} | {tour.priceLabel}
        </p>
      </div>

      <BookTourForm
        tour={{
          slug: tour.slug,
          title: tour.title,
          dateLabel: tour.dateLabel,
          priceLabel: tour.priceLabel,
          whatsappNumber: tour.whatsappNumber,
        }}
      />
    </div>
  );
}
