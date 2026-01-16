// app/api/admin/tours/[slug]/route.ts

import { NextResponse } from 'next/server';
import * as toursRepo from '../../../../lib/data/tours.repo';

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const body = await req.json();
  const updated = await (toursRepo as any).updateTourBySlug(params.slug, body);
  if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  const deleted = await (toursRepo as any).deleteTourBySlug(params.slug);
  if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
