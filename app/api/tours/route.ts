import { NextResponse } from 'next/server';
import { listTours } from '../../../lib/data/tours.repo';
import { getDatabaseErrorMessage } from '../../../lib/db/error-message';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const tours = await listTours();
    return NextResponse.json({ tours });
  } catch (error) {
    console.error('Failed to load public tours API:', error);
    return NextResponse.json({ error: getDatabaseErrorMessage(error) }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Use /api/admin/tours to create or update tour content.' },
    { status: 405 }
  );
}
