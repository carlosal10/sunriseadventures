import mongoose, { Schema, models, model, InferSchemaType } from 'mongoose';

const TourSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    short: String,
    summary: String,
    description: { type: String, required: true },
    heroImage: String,
    location: { type: String, required: true },
    price: { type: Number, required: true },
    priceLabel: String,
    dateLabel: String,

    startDate: Date,
    endDate: Date,

    images: [{ type: String }],
    gallery: [{ type: String }],
    videoUrl: String,
    mapEmbed: String,

    highlights: [String],
    includes: [String],
    excludes: [String],
    availability: [
      {
        date: String,
        status: String,
      },
    ],
    testimonials: [
      {
        name: String,
        image: String,
        text: String,
      },
    ],

    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    featuredOrder: { type: Number, default: 999 },
    whatsappNumber: String,

    maxSlots: Number,
    availableSlots: Number,

    mapLocation: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

export type TourDocument = InferSchemaType<typeof TourSchema>;

export const Tour = models.Tour || model<TourDocument>('Tour', TourSchema);

export default Tour;
