import { connectDB } from '../db/mongoose'
import { TourModel } from '../db/models/Tour'
import { mockTourModel } from '../db/mockTourModel'

const HAS_DB = Boolean(process.env.MONGODB_URI)
const Model = HAS_DB ? (TourModel as any) : mockTourModel

export async function listTours() {
  if (!HAS_DB) return (Model as any).find({ published: true })
  await connectDB()
  return TourModel.find({ published: true } as any).lean()
}

export async function getTour(slug: string) {
  if (!HAS_DB) return (Model as any).findOne({ slug, published: true })
  await connectDB()
  return TourModel.findOne({ slug, published: true } as any).lean()
}

export async function listAllToursAdmin() {
  if (!HAS_DB) return (Model as any).find()
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
  if (!HAS_DB) return (Model as any).create(data)
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
  if (!HAS_DB) return (Model as any).findOneAndUpdate({ slug } as any, { $set: data }, { new: true })
  await connectDB()
  return (TourModel as any).findOneAndUpdate(
    { slug } as any,
    { $set: data },
    { new: true }
  ).lean()
}

export async function deleteTourBySlug(slug: string) {
  if (!HAS_DB) return (Model as any).findOneAndDelete({ slug } as any)
  await connectDB()
  return TourModel.findOneAndDelete({ slug } as any)
}
