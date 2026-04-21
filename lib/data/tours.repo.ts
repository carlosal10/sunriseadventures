import { connectDB } from '../db/mongoose';
import Tour from '../db/models/Tour';
import { mockTourModel } from '../db/mockTourModel';
import {
  listAllTours as listFallbackTours,
  type TourAvailability,
  type TourRecord,
  type TourTestimonial,
} from '../domain/tours';

const DEFAULT_WHATSAPP_NUMBER = '254118706567';
const DEFAULT_IMAGE = '/images/tour-island.jpg';

type RawTour = Record<string, any>;
type TourWriteInput = Partial<TourRecord> & {
  price?: number;
  published?: boolean;
  images?: string[];
};

function hasDatabaseConnectionConfig() {
  return Boolean(process.env.MONGODB_URI);
}

function toPlainObject(value: any): RawTour {
  if (!value) return {};
  if (typeof value.toObject === 'function') return value.toObject();
  return value;
}

function asString(value: unknown, fallback = '') {
  if (typeof value === 'string') return value.trim();
  if (value === null || value === undefined) return fallback;
  return String(value).trim();
}

function asNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asBoolean(value: unknown, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.toLowerCase().trim();
    if (['true', 'yes', '1', 'on'].includes(normalized)) return true;
    if (['false', 'no', '0', 'off'].includes(normalized)) return false;
  }
  if (typeof value === 'number') return value !== 0;
  return fallback;
}

function asStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => asString(item)).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeAvailability(value: unknown, fallbackDate = ''): TourAvailability[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        const raw = toPlainObject(item);
        const date = asString(raw.date);
        if (!date) return null;
        return {
          date,
          status: asString(raw.status, 'Available'),
        };
      })
      .filter(Boolean) as TourAvailability[];
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n/)
      .map((line) => {
        const [date, status] = line.split('|').map((part) => part.trim());
        if (!date) return null;
        return { date, status: status || 'Available' };
      })
      .filter(Boolean) as TourAvailability[];
  }

  return fallbackDate ? [{ date: fallbackDate, status: 'Available' }] : [];
}

function normalizeTestimonials(value: unknown): TourTestimonial[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      const raw = toPlainObject(item);
      const text = asString(raw.text);
      if (!text) return null;
      return {
        name: asString(raw.name) || undefined,
        image: asString(raw.image) || undefined,
        text,
      };
    })
    .filter(Boolean) as TourTestimonial[];
}

function formatPriceLabel(priceValue: number) {
  if (!priceValue) return '';
  return `From KES ${new Intl.NumberFormat('en-KE').format(priceValue)}`;
}

function sortTours(tours: TourRecord[]) {
  return [...tours].sort(
    (left, right) =>
      left.featuredOrder - right.featuredOrder || left.title.localeCompare(right.title)
  );
}

function normalizeTour(rawValue: any): TourRecord {
  const raw = toPlainObject(rawValue);
  const gallerySource = asStringArray(raw.gallery).length
    ? asStringArray(raw.gallery)
    : asStringArray(raw.images);
  const heroImage = asString(raw.heroImage, gallerySource[0] || DEFAULT_IMAGE);
  const gallery = gallerySource.length ? gallerySource : [heroImage];
  const priceValue = asNumber(raw.priceValue ?? raw.price, 0);
  const dateLabel = asString(raw.dateLabel);
  const slug = asString(raw.slug, asString(raw.id));
  const summary = asString(raw.summary, asString(raw.short, asString(raw.description)));

  return {
    id: asString(raw._id, asString(raw.id, slug)),
    slug,
    title: asString(raw.title, 'Untitled Tour'),
    short: asString(raw.short, summary),
    summary,
    description: asString(raw.description, summary),
    heroImage,
    gallery,
    dateLabel,
    location: asString(raw.location),
    priceLabel: asString(raw.priceLabel, formatPriceLabel(priceValue)),
    priceValue,
    mapEmbed: asString(raw.mapEmbed),
    highlights: asStringArray(raw.highlights),
    includes: asStringArray(raw.includes),
    excludes: asStringArray(raw.excludes),
    availability: normalizeAvailability(raw.availability, dateLabel),
    testimonials: normalizeTestimonials(raw.testimonials),
    isFeatured: asBoolean(raw.isFeatured, false),
    isPublished: asBoolean(raw.isPublished ?? raw.published, true),
    featuredOrder: asNumber(raw.featuredOrder, 999),
    whatsappNumber: asString(raw.whatsappNumber, DEFAULT_WHATSAPP_NUMBER),
  };
}

function toStoreInput(data: TourWriteInput) {
  const gallery = asStringArray(data.gallery ?? data.images);
  const priceValue = asNumber(data.priceValue ?? data.price, 0);
  const dateLabel = asString(data.dateLabel);
  const heroImage = asString(data.heroImage, gallery[0] || DEFAULT_IMAGE);

  return {
    id: asString(data.id, asString(data.slug)),
    slug: asString(data.slug),
    title: asString(data.title, 'Untitled Tour'),
    short: asString(data.short),
    summary: asString(data.summary, asString(data.short, asString(data.description))),
    description: asString(data.description),
    heroImage,
    location: asString(data.location),
    price: priceValue,
    priceValue,
    priceLabel: asString(data.priceLabel, formatPriceLabel(priceValue)),
    dateLabel,
    images: gallery,
    gallery: gallery.length ? gallery : [heroImage],
    mapEmbed: asString(data.mapEmbed),
    highlights: asStringArray(data.highlights),
    includes: asStringArray(data.includes),
    excludes: asStringArray(data.excludes),
    availability: normalizeAvailability(data.availability, dateLabel),
    testimonials: normalizeTestimonials(data.testimonials),
    isFeatured: asBoolean(data.isFeatured, false),
    isPublished: asBoolean(data.isPublished ?? data.published, true),
    published: asBoolean(data.isPublished ?? data.published, true),
    featuredOrder: asNumber(data.featuredOrder, 999),
    whatsappNumber: asString(data.whatsappNumber, DEFAULT_WHATSAPP_NUMBER),
  };
}

async function withTourStore<T>(
  dbOperation: () => Promise<T>,
  fallbackOperation: () => Promise<T>,
  options: { fallbackOnDatabaseError?: boolean } = {}
) {
  const { fallbackOnDatabaseError = true } = options;

  if (!hasDatabaseConnectionConfig()) {
    return fallbackOperation();
  }

  try {
    await connectDB();
    return await dbOperation();
  } catch (error) {
    if (!fallbackOnDatabaseError) {
      throw error;
    }

    console.error('Falling back to in-memory tour storage.', error);
    return fallbackOperation();
  }
}

export async function listTours() {
  const tours = await withTourStore(
    async () => Tour.find({ isPublished: true }).sort({ featuredOrder: 1, title: 1 }).lean(),
    async () => mockTourModel.find({ isPublished: true })
  );

  return sortTours((tours as any[]).map(normalizeTour).filter((tour) => tour.isPublished));
}

export async function listFeaturedTours(limit = 5) {
  const tours = await listTours();
  return tours.filter((tour) => tour.isFeatured).slice(0, limit);
}

export async function getTour(slug: string) {
  const tour = await withTourStore(
    async () => Tour.findOne({ slug, isPublished: true }).lean(),
    async () => mockTourModel.findOne({ slug, isPublished: true })
  );

  return tour ? normalizeTour(tour) : null;
}

export async function getTourAdmin(slug: string) {
  const tour = await withTourStore(
    async () => Tour.findOne({ slug }).lean(),
    async () => mockTourModel.findOne({ slug }),
    { fallbackOnDatabaseError: false }
  );

  return tour ? normalizeTour(tour) : null;
}

export async function listAllToursAdmin() {
  const tours = await withTourStore(
    async () => Tour.find().sort({ featuredOrder: 1, title: 1 }).lean(),
    async () => mockTourModel.find(),
    { fallbackOnDatabaseError: false }
  );

  return sortTours((tours as any[]).map(normalizeTour));
}

export async function createTour(data: TourWriteInput) {
  const payload = toStoreInput(data);

  const tour = await withTourStore(
    async () => Tour.create(payload),
    async () => mockTourModel.create(payload),
    { fallbackOnDatabaseError: false }
  );

  return normalizeTour(tour);
}

export async function updateTourBySlug(slug: string, data: TourWriteInput) {
  const payload = toStoreInput({ ...data, slug });

  const tour = await withTourStore(
    async () => Tour.findOneAndUpdate({ slug }, { $set: payload }, { new: true }).lean(),
    async () => mockTourModel.findOneAndUpdate({ slug }, { $set: payload }),
    { fallbackOnDatabaseError: false }
  );

  return tour ? normalizeTour(tour) : null;
}

export async function deleteTourBySlug(slug: string) {
  const tour = await withTourStore(
    async () => Tour.findOneAndDelete({ slug }).lean(),
    async () => mockTourModel.findOneAndDelete({ slug }),
    { fallbackOnDatabaseError: false }
  );

  return tour ? normalizeTour(tour) : null;
}

export function fallbackToursForSeed() {
  return listFallbackTours();
}
