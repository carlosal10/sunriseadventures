import { listAllTours, type TourRecord } from '../domain/tours';

type MockTour = TourRecord & {
  _id?: string;
  published?: boolean;
};

const seed: MockTour[] = listAllTours().map((tour, index) => ({
  _id: String(index + 1),
  published: tour.isPublished,
  ...tour,
}));

function clone<T>(value: T) {
  return JSON.parse(JSON.stringify(value)) as T;
}

function matchesFilter(tour: MockTour, filter?: Record<string, unknown>) {
  if (!filter || Object.keys(filter).length === 0) return true;

  if (typeof filter.slug === 'string' && tour.slug !== filter.slug) return false;

  if (typeof filter.isPublished === 'boolean' && tour.isPublished !== filter.isPublished) {
    return false;
  }

  if (typeof filter.published === 'boolean' && tour.isPublished !== filter.published) {
    return false;
  }

  return true;
}

export const mockTourModel = {
  async find(filter?: Record<string, unknown>) {
    return clone(seed.filter((tour) => matchesFilter(tour, filter)));
  },

  async findOne(filter: Record<string, unknown>) {
    return clone(seed.find((tour) => matchesFilter(tour, filter)) ?? null);
  },

  async findOneAndUpdate(filter: Record<string, unknown>, update: any) {
    const tour = seed.find((item) => matchesFilter(item, filter));
    if (!tour) return null;

    const set = update.$set || {};
    Object.assign(tour, set);

    if (set.published !== undefined && set.isPublished === undefined) {
      tour.isPublished = Boolean(set.published);
    }

    if (set.isPublished !== undefined) {
      tour.published = Boolean(set.isPublished);
    }

    return clone(tour);
  },

  async findOneAndDelete(filter: Record<string, unknown>) {
    const index = seed.findIndex((tour) => matchesFilter(tour, filter));
    if (index === -1) return null;

    const [deleted] = seed.splice(index, 1);
    return clone(deleted);
  },

  async create(data: Partial<MockTour>) {
    const doc: MockTour = {
      _id: String(seed.length + 1),
      id: data.id ?? data.slug ?? `tour-${seed.length + 1}`,
      slug: data.slug ?? `tour-${seed.length + 1}`,
      title: data.title ?? 'Untitled Tour',
      short: data.short ?? '',
      summary: data.summary ?? data.description ?? '',
      description: data.description ?? '',
      heroImage: data.heroImage ?? '/images/tour-island.jpg',
      gallery: data.gallery ?? [],
      dateLabel: data.dateLabel ?? '',
      location: data.location ?? '',
      priceLabel: data.priceLabel ?? '',
      priceValue: data.priceValue ?? 0,
      mapEmbed: data.mapEmbed ?? '',
      highlights: data.highlights ?? [],
      includes: data.includes ?? [],
      excludes: data.excludes ?? [],
      availability: data.availability ?? [],
      testimonials: data.testimonials ?? [],
      isFeatured: Boolean(data.isFeatured),
      isPublished: data.isPublished ?? data.published ?? true,
      featuredOrder: data.featuredOrder ?? seed.length + 1,
      whatsappNumber: data.whatsappNumber ?? '254118706567',
      published: data.isPublished ?? data.published ?? true,
    };

    seed.push(doc);
    return clone(doc);
  },

  async insertMany(items: Partial<MockTour>[]) {
    const docs = await Promise.all(items.map((item) => this.create(item)));
    return clone(docs);
  },
};
