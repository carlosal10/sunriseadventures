import { NextResponse } from 'next/server';
import { createBooking, listBookings } from '../../../lib/data/bookings.repo';
import { getTour } from '../../../lib/data/tours.repo';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KENYAN_PHONE_PATTERN = /^(?:2547\d{8}|07\d{8})$/;

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, '');
}

export async function GET() {
  const bookings = await listBookings();
  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const tourSlug = String(body.tour ?? body.tourSlug ?? '').trim();
  const name = String(body.name ?? '').trim();
  const phone = normalizePhone(String(body.phone ?? '').trim());
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();
  const people = Number(body.people);

  if (!tourSlug || !name || !phone || !Number.isInteger(people) || people < 1) {
    return NextResponse.json(
      { error: 'Tour, name, phone, and number of people are required.' },
      { status: 400 }
    );
  }

  if (!KENYAN_PHONE_PATTERN.test(phone)) {
    return NextResponse.json(
      { error: 'Please provide a valid Kenyan phone number.' },
      { status: 400 }
    );
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const tour = await getTour(tourSlug);
  if (!tour) {
    return NextResponse.json({ error: 'Selected tour could not be found.' }, { status: 404 });
  }

  const booking = await createBooking({
    tourSlug: tour.slug,
    tourTitle: tour.title,
    name,
    phone,
    email: email || undefined,
    people,
    message: message || undefined,
  });

  return NextResponse.json({ booking }, { status: 201 });
}
