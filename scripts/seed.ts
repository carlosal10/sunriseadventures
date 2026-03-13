import { connectDB } from '../lib/db/mongoose';
import Tour from '../lib/db/models/Tour';

async function seed() {
  await connectDB();

  await Tour.deleteMany({});

  await Tour.insertMany([
    {
      title: 'Safari Rally Edition',
      slug: 'safari-rally-edition',
      description: 'Experience the thrill of the World Rally Championship (WRC) Safari Rally Kenya with Sunrise Tours & Adventure in Naivasha.',
      location: 'Naivasha, Kenya',
      price: 3500,
      isPublished: true,
      isFeatured: true,
      images: ['/images/safari-rally/1.jpg'],
    },
  ]);

  console.log('✅ Database seeded successfully');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed', err);
  process.exit(1);
});
