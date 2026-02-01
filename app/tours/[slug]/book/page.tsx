'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function BookTourPage() {
  const { slug } = useParams();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    people: '1',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Kenyan phone validation
  const isValidKenyanPhone = (phone: string) => {
    const normalized = phone.replace(/\D/g, ''); // remove non-digits
    return /^(?:2547\d{8}|07\d{8})$/.test(normalized);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.people) {
      alert('Please fill all required fields.');
      return;
    }

    if (!isValidKenyanPhone(form.phone)) {
      alert('Please enter a valid Kenyan phone number.');
      return;
    }

    setLoading(true);

    const text = `
*New Tour Booking Request* 🌍

*Tour:* ${slug}
*Name:* ${form.name}
*Phone:* ${form.phone}
*Email:* ${form.email}
*Number of People:* ${form.people}

*Message:*
${form.message}
    `;

    try {
      // Log booking to DB first
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tour: slug }),
      });

      const phoneNumber = '254118706567';
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

      // Fallback if WhatsApp not installed
      const newWindow = window.open(whatsappURL, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        alert('Could not open WhatsApp. Please make sure WhatsApp is installed.');
      }
    } catch (err) {
      console.error(err);
      alert('Booking failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-14 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Book This Tour</h1>
        <p className="text-gray-600">
          Fill in the details below and we’ll confirm availability via WhatsApp.
        </p>
      </div>

      <div className="bg-white border rounded-2xl p-6 space-y-5 shadow-sm">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        />

        <select
          name="people"
          value={form.people}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n} Person{n > 1 && 's'}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          placeholder="Any special requests or questions?"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>

        <Link href={`/tours/${slug}`} className="block text-center text-sm text-gray-500">
          ← Back to tour details
        </Link>
      </div>
    </div>
  );
}
