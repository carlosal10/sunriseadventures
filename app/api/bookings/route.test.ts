import { GET, POST } from './route';

const originalMongoUri = process.env.MONGODB_URI;

beforeEach(() => {
  delete process.env.MONGODB_URI;
});

afterAll(() => {
  if (originalMongoUri) {
    process.env.MONGODB_URI = originalMongoUri;
  } else {
    delete process.env.MONGODB_URI;
  }
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
