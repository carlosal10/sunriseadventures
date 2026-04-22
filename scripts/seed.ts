import { connectDB } from '../lib/db/mongoose';

async function seed() {
  await connectDB();

  console.log('No built-in tour seed data is bundled anymore.');
  console.log('Create tours from the admin dashboard instead.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed.', err);
  process.exit(1);
});
