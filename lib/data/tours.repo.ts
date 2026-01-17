import { connectDB } from '../db/mongoose'
import { TourModel } from '../db/models/Tour'

export async function listTours() {
  await connectDB()
  return TourModel.find({ published: true } as any).lean()
}

export async function getTour(slug: string) {
  await connectDB()
  return TourModel.findOne({ slug, published: true } as any).lean()
}

export async function listAllToursAdmin() {
  await connectDB()
  return TourModel.find().lean()
}

export async function createTour(data: {
  slug: string
  title: string
  short: string
  description: string
  price: number
  durationDays: number
}) {
  await connectDB()
  return TourModel.create(data)
}
export async function updateTourBySlug(
  slug: string,
  data: Partial<{
    title: string
    short: string
    description: string
    price: number
    durationDays: number
    published: boolean
  }>
) {
  await connectDB()
  return (TourModel as any).findOneAndUpdate(
    { slug } as any,
    { $set: data },
    { new: true }
  ).lean()
}

export async function deleteTourBySlug(slug: string) {
  await connectDB()
  return TourModel.findOneAndDelete({ slug } as any)
}
