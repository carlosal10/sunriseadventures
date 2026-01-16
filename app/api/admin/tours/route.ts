import { NextResponse } from 'next/server';
import { createTour } from '../../../../lib/data/tours.repo';

export async function POST(req: Request) {
  // TEMP: auth comes next phase
  const body = await req.json();

  const tour = await createTour(body);
  return NextResponse.json(tour, { status: 201 });
}
