import { NextResponse } from "next/server"
import { updateTourBySlug, deleteTourBySlug } from "../../../../../lib/data/tours.repo"

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const body = await req.json()
  const updated = await updateTourBySlug(params.slug, body)
  return NextResponse.json({ success: !!updated })
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  await deleteTourBySlug(params.slug)
  return NextResponse.json({ success: true })
}
