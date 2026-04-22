export type TourAvailability = {
  date: string;
  status: string;
};

export type TourTestimonial = {
  name?: string;
  image?: string;
  text: string;
};

export type TourRecord = {
  id: string;
  slug: string;
  title: string;
  short: string;
  summary: string;
  description: string;
  heroImage: string;
  gallery: string[];
  dateLabel: string;
  location: string;
  priceLabel: string;
  priceValue: number;
  mapEmbed: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  availability: TourAvailability[];
  testimonials: TourTestimonial[];
  isFeatured: boolean;
  isPublished: boolean;
  featuredOrder: number;
  whatsappNumber: string;
};
