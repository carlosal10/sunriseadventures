import { connectDB } from '../lib/db/mongoose';
import Tour from '../lib/db/models/Tour';
import { listAllTours } from '../lib/domain/tours';

async function seed() {
  await connectDB();

  await Tour.deleteMany({});

  await Tour.insertMany(
    listAllTours().map((tour) => ({
      title: tour.title,
      slug: tour.slug,
      short: tour.short,
      summary: tour.summary,
      description: tour.description,
      heroImage: tour.heroImage,
      location: tour.location,
      price: tour.priceValue,
      priceLabel: tour.priceLabel,
      dateLabel: tour.dateLabel,
      images: tour.gallery,
      gallery: tour.gallery,
      mapEmbed: tour.mapEmbed,
      highlights: tour.highlights,
      includes: tour.includes,
      excludes: tour.excludes,
      availability: tour.availability,
      testimonials: tour.testimonials,
      isFeatured: tour.isFeatured,
      isPublished: tour.isPublished,
      featuredOrder: tour.featuredOrder,
      whatsappNumber: tour.whatsappNumber,
    }))
  );

  console.log('Database seeded successfully.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed.', err);
  process.exit(1);
});
