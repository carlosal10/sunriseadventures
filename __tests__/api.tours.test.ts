import { GET } from "../app/api/tours/route"
import { createTour, getTour } from "../lib/data/tours.repo"
import { mockTourModel } from "../lib/db/mockTourModel"

const originalMongoUri = process.env.MONGODB_URI

beforeEach(() => {
  delete process.env.MONGODB_URI
  mockTourModel.reset()
})

afterAll(() => {
  if (originalMongoUri) {
    process.env.MONGODB_URI = originalMongoUri
  } else {
    delete process.env.MONGODB_URI
  }
})

test("api returns tours", async () => {
  const res = await GET()
  const json = await res.json()
  expect(json.tours).toBeDefined()
  expect(Array.isArray(json.tours)).toBe(true)
  expect(json.tours).toHaveLength(0)
})

test("dirty title-style slugs are normalized for listings and detail lookup", async () => {
  await createTour({
    slug: "Elephant Hill Hike – Aberdare Adventure",
    title: "Elephant Hill Hike – Aberdare Adventure",
    short: "A summit push with moorland views.",
    summary: "A rewarding Aberdare day hike.",
    description: "A rewarding Aberdare day hike with a strong summit finish.",
    heroImage: "/images/tour-island.jpg",
    gallery: ["/images/tour-island.jpg"],
    dateLabel: "1 Jun 2026",
    location: "Aberdare Range",
    priceValue: 4500,
    priceLabel: "From KES 4,500",
    mapEmbed: "https://www.google.com/maps?q=Aberdare&output=embed",
    highlights: ["Summit trek"],
    includes: ["Guide"],
    excludes: ["Personal expenses"],
    availability: [{ date: "1 Jun 2026", status: "Available" }],
    testimonials: [],
    isFeatured: true,
    isPublished: true,
    featuredOrder: 1,
    whatsappNumber: "254118706567",
  })

  const res = await GET()
  const json = await res.json()
  expect(json.tours[0]).toMatchObject({
    slug: "elephant-hill-hike-aberdare-adventure",
    title: "Elephant Hill Hike – Aberdare Adventure",
  })

  const tour = await getTour("elephant-hill-hike-aberdare-adventure")
  expect(tour?.title).toBe("Elephant Hill Hike – Aberdare Adventure")
})
