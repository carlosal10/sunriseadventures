export type Tour = {
  id: string
  slug: string
  title: string
  short: string
  description: string
  price: number
  durationDays: number
  published: boolean
}
const TOURS: Tour[] = [
  {
    id: "island-getaway",
    slug: "island-getaway",
    title: "Island Getaway",
    short: "Relax at a premium beachfront resort with water activities",
    description: "A 5-day island escape including resort stay, snorkeling and local cuisine experiences.",
    price: 899,
    durationDays: 5,
    published: true,
  },
  {
    id: "mountain-adventure",
    slug: "mountain-adventure",
    title: "Mountain Adventure",
    short: "Guided hikes and camping under the stars",
    description: "A 7-day multi-day trek with guided hikes and camping equipment included.",
    price: 1199,
    durationDays: 7,
    published: true,
  },
  {
    id: "historic-city",
    slug: "historic-city",
    title: "Historic City Tour",
    short: "Cultural highlights with expert guides",
    description: "A 3-day city break visiting museums, historic sites and local cuisine tours.",
    price: 499,
    durationDays: 3,
    published: true,
  },
  {
    id: "safari-discovery",
    slug: "safari-discovery",
    title: "Safari Discovery",
    short: "Wildlife safaris and conservation talks",
    description: "6-day guided safari with expert naturalists and comfortable lodges.",
    price: 1899,
    durationDays: 6,
    published: true,
  },
  {
    id: "northern-lights",
    slug: "northern-lights",
    title: "Northern Lights",
    short: "Aurora chasing and cozy stays",
    description: "4-day aurora viewing trips with local guides and night photography tips.",
    price: 1299,
    durationDays: 4,
    published: true,
  },
  {
    id: "culinary-escape",
    slug: "culinary-escape",
    title: "Culinary Escape",
    short: "Local food tours, markets and cooking classes",
    description: "5-day culinary tour focused on markets, street food and hands-on lessons.",
    price: 799,
    durationDays: 5,
    published: true,
  },
]

export function getTours() {
  return TOURS
}

export function getTourBySlug(slug: string) {
  return TOURS.find(t => t.slug === slug)
}

export default TOURS
