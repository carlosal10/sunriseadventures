import { connectDB } from '../lib/db/mongoose'
import { TourModel } from '../lib/db/models/Tour'

async function seed() {
  await connectDB()

  await TourModel.deleteMany()

  await (TourModel as any).insertMany([
    {
      slug: 'island-getaway',
      title: 'Island Getaway',
      short: 'Relax at a beachfront resort',
      description: '5-day island escape with snorkeling',
      price: 899,
      durationDays: 5,
      published: true,
    },
  ])

  console.log('Seed complete')
  process.exit(0)
}

seed()
