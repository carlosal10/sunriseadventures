import { GET } from "../app/api/tours/route"

test("api returns tours", async () => {
  const res = await GET()
  const json = await res.json()
  expect(json.tours).toBeDefined()
  expect(Array.isArray(json.tours)).toBe(true)
})
