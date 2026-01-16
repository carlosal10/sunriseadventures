import { connectDB } from '../db/mongoose'
import { TourModel } from '../db/models/Tour'

export async function listTours() {
  await connectDB()
  return TourModel.find({ published: true }).lean()
}

export async function getTour(slug: string) {
  await connectDB()
  return TourModel.findOne({ slug, published: true }).lean()
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
