import { NextResponse } from 'next/server';
import { createTour, listAllToursAdmin } from '../../../../lib/data/tours.repo';

export const dynamic = 'force-dynamic';

function validateTourPayload(body: Record<string, unknown>) {
  const missing = ['slug', 'title', 'description', 'location'].filter(
    (field) => !String(body[field] ?? '').trim()
  );

  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(', ')}.`;
  }

  return null;
}

export async function GET() {
  const tours = await listAllToursAdmin();
  return NextResponse.json({ tours });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: 'Invalid JSON payload.' }, { status: 400 });
  }

  const validationError = validateTourPayload(body);
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  try {
    const tour = await createTour(body);
    return NextResponse.json({ tour }, { status: 201 });
  } catch (error) {
    console.error('Failed to create tour:', error);
    return NextResponse.json(
      { message: 'Tour could not be saved. Check the database connection and try again.' },
      { status: 500 }
    );
  }
}
