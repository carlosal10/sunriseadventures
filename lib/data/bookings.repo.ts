import { connectDB } from '../db/mongoose';
import Booking from '../db/models/Booking';
import { mockBookingModel } from '../db/mockBookingModel';

function hasDatabaseConnectionConfig() {
  return Boolean(process.env.MONGODB_URI);
}

export type CreateBookingInput = {
  tourSlug: string;
  tourTitle: string;
  name: string;
  phone: string;
  email?: string;
  people: number;
  message?: string;
  status?: string;
};

async function withBookingStore<T>(
  dbOperation: () => Promise<T>,
  fallbackOperation: () => Promise<T>
) {
  if (!hasDatabaseConnectionConfig()) {
    return fallbackOperation();
  }

  try {
    await connectDB();
    return await dbOperation();
  } catch (error) {
    console.error('Falling back to in-memory booking storage.', error);
    return fallbackOperation();
  }
}

export async function listBookings() {
  return withBookingStore(
    async () => Booking.find().sort({ createdAt: -1 }).lean(),
    async () => mockBookingModel.find()
  );
}

export async function createBooking(input: CreateBookingInput) {
  return withBookingStore(
    async () => Booking.create(input),
    async () => mockBookingModel.create(input)
  );
}
