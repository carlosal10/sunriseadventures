import { connectDB } from '../lib/db/mongoose';
import Tour from '../lib/db/models/Tour';

async function seed() {
  await connectDB();

  await Tour.deleteMany({});

  await Tour.insertMany([
    {
      title: 'Tigoni Experience',
      slug: 'tigoni-experience',
      description: 'A refreshing countryside escape in Tigoni.',
      location: 'Tigoni, Kenya',
      price: 2800,
      isPublished: true,
      isFeatured: true,
      images: ['/images/tour-island.jpg'],
    },
    {
      title: 'Nyamindi Hike',
      slug: 'nyamindi-hike',
      description: 'A guided hike to Nyamindi Falls.',
      location: 'Kathandeni Forest',
      price: 2850,
      isPublished: true,
      images: ['/images/tour-safari.jpg'],
    },
  ]);

  console.log('✅ Database seeded successfully');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed', err);
  process.exit(1);
});
