import { connectDB } from '../db/mongoose';
import Tour from '../db/models/Tour';
import { mockTourModel } from '../db/mockTourModel';

const HAS_DB = Boolean(process.env.MONGODB_URI);
const Model = HAS_DB ? Tour : mockTourModel;

export async function listTours() {
  if (!HAS_DB) return (Model as any).find({ isPublished: true });
  await connectDB();
  return Tour.find({ isPublished: true }).lean();
}

export async function getTour(slug: string) {
  if (!HAS_DB) return (Model as any).findOne({ slug, isPublished: true });
  await connectDB();
  return Tour.findOne({ slug, isPublished: true }).lean();
}

export async function listAllToursAdmin() {
  if (!HAS_DB) return (Model as any).find();
  await connectDB();
  return Tour.find().lean();
}

export async function createTour(data: any) {
  if (!HAS_DB) return (Model as any).create(data);
  await connectDB();
  return Tour.create(data);
}

export async function updateTourBySlug(slug: string, data: Partial<any>) {
  if (!HAS_DB) return (Model as any).findOneAndUpdate({ slug }, { $set: data }, { new: true });

  await connectDB();
  return Tour.findOneAndUpdate({ slug }, { $set: data }, { new: true }).lean();
}

export async function deleteTourBySlug(slug: string) {
  if (!HAS_DB) return (Model as any).findOneAndDelete({ slug });
  await connectDB();
  return Tour.findOneAndDelete({ slug });
}
