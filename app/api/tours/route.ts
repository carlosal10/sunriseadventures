import { NextResponse } from 'next/server';
import { listPublishedTours } from '../../../lib/domain/tours';

export async function GET() {
  const tours = listPublishedTours();
  return NextResponse.json({ tours });
}

export async function POST() {
  return NextResponse.json(
    { error: 'Use /api/admin/tours to create or update tour content.' },
    { status: 405 }
  );
}
