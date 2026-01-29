import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db/mongoose';
import Tour from '../../../../../lib/db/models/Tour';

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  await connectDB();
  const data = await req.json();

  const tour = await Tour.findOneAndUpdate(
    { slug: params.slug as string },
    data,
    { new: true, upsert: false }
  );

  return NextResponse.json(tour);
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  await connectDB();
  await Tour.findOneAndDelete({ slug: params.slug as string });
  return NextResponse.json({ success: true });
}
