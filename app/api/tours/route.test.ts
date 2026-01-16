import { GET } from "./route"

test("GET returns NextResponse with tours", async () => {
  const res = await GET()
  const json = await res.json()
  expect(json.tours).toBeDefined()
})
