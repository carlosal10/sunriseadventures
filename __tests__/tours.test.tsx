import { render, screen } from "@testing-library/react"
import Tours from "../app/tours/page"

jest.mock("../lib/tours", () => ({
  getTours: () => [
    { slug: "t1", title: "T1", short: "s", price: "$1" }
  ]
}))

test("renders tours list", async () => {
  const Component = await Tours()
  render(Component)
  expect(await screen.findByText("T1")).toBeInTheDocument()
})
