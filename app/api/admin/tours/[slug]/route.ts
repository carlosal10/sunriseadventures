import { NextResponse } from 'next/server';
import { deleteTourBySlug, updateTourBySlug } from '../../../../../lib/data/tours.repo';
import { getDatabaseErrorMessage } from '../../../../../lib/db/error-message';

export const dynamic = 'force-dynamic';

function validateTourPayload(body: Record<string, unknown>) {
  const missing = ['title', 'description', 'location'].filter(
    (field) => !String(body[field] ?? '').trim()
  );

  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(', ')}.`;
  }

  return null;
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
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

  let tour;

  try {
    tour = await updateTourBySlug(params.slug, body);
  } catch (error) {
    console.error('Failed to update tour:', error);
    return NextResponse.json(
      { message: getDatabaseErrorMessage(error) },
      { status: 500 }
    );
  }

  if (!tour) {
    return NextResponse.json({ message: 'Tour not found.' }, { status: 404 });
  }

  return NextResponse.json({ tour });
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  let tour;

  try {
    tour = await deleteTourBySlug(params.slug);
  } catch (error) {
    console.error('Failed to delete tour:', error);
    return NextResponse.json(
      { message: getDatabaseErrorMessage(error) },
      { status: 500 }
    );
  }

  if (!tour) {
    return NextResponse.json({ message: 'Tour not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
