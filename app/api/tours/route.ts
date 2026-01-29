import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db/mongoose';
import Tour from './../../../lib/db/models/Tour';

export async function GET() {
  await connectDB();
  const tours = await Tour.find().sort({ createdAt: -1 });
  return NextResponse.json(tours);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const tour = await Tour.create(body);
  return NextResponse.json(tour, { status: 201 });
}
