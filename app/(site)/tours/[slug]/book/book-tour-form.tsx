'use client';

import { useState } from 'react';
import Link from 'next/link';

type TourBookingDetails = {
  slug: string;
  title: string;
  dateLabel: string;
  priceLabel: string;
  whatsappNumber: string;
};

type Props = {
  tour: TourBookingDetails;
};

type FeedbackState = {
  kind: 'error' | 'success';
  message: string;
} | null;

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, '');
}

function isValidKenyanPhone(phone: string) {
  return /^(?:2547\d{8}|07\d{8})$/.test(phone);
}

export default function BookTourForm({ tour }: Props) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    people: '1',
    message: '',
  });
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async () => {
    const normalizedPhone = normalizePhone(form.phone);

    if (!form.name || !form.phone || !form.people) {
      setFeedback({ kind: 'error', message: 'Please fill in the required fields.' });
      return;
    }

    if (!isValidKenyanPhone(normalizedPhone)) {
      setFeedback({
        kind: 'error',
        message: 'Please enter a valid Kenyan phone number.',
      });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tour: tour.slug,
          name: form.name,
          phone: normalizedPhone,
          email: form.email,
          people: form.people,
          message: form.message,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setFeedback({
          kind: 'error',
          message: payload.error ?? 'Booking failed. Please try again later.',
        });
        return;
      }

      const bookingText = [
        'New Tour Booking Request',
        '',
        `Tour: ${tour.title}`,
        `Date: ${tour.dateLabel}`,
        `Price: ${tour.priceLabel}`,
        `Name: ${form.name}`,
        `Phone: ${normalizedPhone}`,
        `Email: ${form.email || 'Not provided'}`,
        `Number of People: ${form.people}`,
        '',
        'Message:',
        form.message || 'No extra message.',
      ].join('\n');

      const whatsappUrl = `https://wa.me/${tour.whatsappNumber}?text=${encodeURIComponent(
        bookingText
      )}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setFeedback({
        kind: 'success',
        message: 'Booking saved. WhatsApp should now open so you can finish the conversation.',
      });
    } catch (error) {
      console.error(error);
      setFeedback({
        kind: 'error',
        message: 'Booking failed. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
          className="form-control"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-[1fr_12rem]">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="form-control"
        />

        <select name="people" value={form.people} onChange={handleChange} className="form-control">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
            <option key={count} value={count}>
              {count} Person{count > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="message"
        placeholder="Any special requests or questions?"
        rows={5}
        value={form.message}
        onChange={handleChange}
        className="form-control"
      />

      {feedback && (
        <div
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
            feedback.kind === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 sm:w-auto"
        >
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>

        <Link href={`/tours/${tour.slug}`} className="btn-secondary">
          &lt; Back to tour details
        </Link>
      </div>
    </div>
  );
}
