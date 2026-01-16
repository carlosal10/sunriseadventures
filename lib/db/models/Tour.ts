import { Schema, model, models } from 'mongoose'

const TourSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    short: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    durationDays: { type: Number, required: true },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const TourModel = models.Tour || model('Tour', TourSchema)
