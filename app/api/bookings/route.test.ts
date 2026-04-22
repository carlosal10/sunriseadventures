import { GET, POST } from './route';
import { createTour } from '../../../lib/data/tours.repo';
import { mockTourModel } from '../../../lib/db/mockTourModel';

const originalMongoUri = process.env.MONGODB_URI;

beforeEach(() => {
  delete process.env.MONGODB_URI;
  mockTourModel.reset();
});

afterAll(() => {
  if (originalMongoUri) {
    process.env.MONGODB_URI = originalMongoUri;
  } else {
    delete process.env.MONGODB_URI;
  }
});

beforeEach(async () => {
  await createTour({
    slug: 'tigoni-experience',
    title: 'Tigoni Experience',
    short: 'A countryside reset with farm views, walks, and easy adventure.',
    summary: 'Escape the city for a one-day countryside experience.',
    description: 'Escape the city and immerse yourself in a refreshing countryside experience.',
    heroImage: '/images/tigoni/1.jpg',
    gallery: ['/images/tigoni/1.jpg'],
    dateLabel: '24 Jan 2026',
    location: 'Tigoni, Limuru',
    priceValue: 2800,
    priceLabel: 'From KES 2,800',
    mapEmbed: 'https://www.google.com/maps?q=Tigoni%20Limuru&output=embed',
    highlights: ['Guided farm tour'],
    includes: ['Return transport'],
    excludes: ['Personal expenses'],
    availability: [{ date: '24 Jan 2026', status: 'Available' }],
    testimonials: [],
    isFeatured: true,
    isPublished: true,
    featuredOrder: 1,
    whatsappNumber: '254118706567',
  });
});

test('POST creates a booking for a known tour', async () => {
  const request = new Request('http://localhost/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tour: 'tigoni-experience',
      name: 'Jane Doe',
      phone: '0712345678',
      email: 'jane@example.com',
      people: 2,
      message: 'We would like to travel as a pair.',
    }),
  });

  const response = await POST(request);
  const payload = await response.json();

  expect(response.status).toBe(201);
  expect(payload.booking).toMatchObject({
    tourSlug: 'tigoni-experience',
    tourTitle: 'Tigoni Experience',
    name: 'Jane Doe',
    phone: '0712345678',
    people: 2,
  });
});

test('POST validates the phone number', async () => {
  const request = new Request('http://localhost/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tour: 'tigoni-experience',
      name: 'Jane Doe',
      phone: '12345',
      people: 2,
    }),
  });

  const response = await POST(request);
  const payload = await response.json();

  expect(response.status).toBe(400);
  expect(payload.error).toMatch(/valid Kenyan phone number/i);
});

test('GET returns saved bookings', async () => {
  const response = await GET();
  const payload = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(payload.bookings)).toBe(true);
});
