import { getTours } from "../../../lib/domain/tours"

export async function GET() {
  const tours = getTours()
  return new Response(JSON.stringify({ tours }), {
    headers: { "Content-Type": "application/json" },
  })
}
