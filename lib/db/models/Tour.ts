import mongoose, { Schema, models, model, InferSchemaType } from 'mongoose';

const TourSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },

    startDate: Date,
    endDate: Date,

    images: [{ type: String }],
    videoUrl: String,

    highlights: [String],
    includes: [String],
    excludes: [String],

    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },

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
