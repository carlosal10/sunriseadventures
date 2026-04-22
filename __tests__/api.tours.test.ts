import { GET } from "../app/api/tours/route"
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
