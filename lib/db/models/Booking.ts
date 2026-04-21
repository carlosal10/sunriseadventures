import mongoose, { InferSchemaType, Schema, model, models } from 'mongoose';

const BookingSchema = new Schema(
  {
    tourSlug: { type: String, required: true },
    tourTitle: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    people: { type: Number, required: true, min: 1 },
    message: String,
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

export type BookingDocument = InferSchemaType<typeof BookingSchema>;

export const Booking = models.Booking || model<BookingDocument>('Booking', BookingSchema);

export default Booking;
