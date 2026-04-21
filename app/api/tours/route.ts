import { NextResponse } from 'next/server';
import { listTours } from '../../../lib/data/tours.repo';

export const dynamic = 'force-dynamic';

export async function GET() {
  const tours = await listTours();
  return NextResponse.json({ tours });
}

export async function POST() {
  return NextResponse.json(
    { error: 'Use /api/admin/tours to create or update tour content.' },
    { status: 405 }
  );
}
