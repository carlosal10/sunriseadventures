import { GET } from "./route"

test("GET returns NextResponse with tours", async () => {
  const res = await GET()
  const json = await res.json()
  expect(json.tours).toBeDefined()
  expect(Array.isArray(json.tours)).toBe(true)
  expect(json.tours[0]).toMatchObject({
    slug: expect.any(String),
    title: expect.any(String),
  })
})
