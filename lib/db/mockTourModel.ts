type Tour = {
  _id?: string
  slug: string
  title: string
  short: string
  description: string
  price: number
  durationDays: number
  published?: boolean
}

const seed: Tour[] = [
  {
    _id: '1',
    slug: 'island-getaway',
    title: 'Island Getaway',
    short: 'Relax at a beachfront resort',
    description: '5-day island escape with snorkeling',
    price: 899,
    durationDays: 5,
    published: true,
  },
]

function clone<T>(v: T) {
  return JSON.parse(JSON.stringify(v)) as T
}

export const mockTourModel = {
  async find(filter?: any) {
    if (!filter || Object.keys(filter).length === 0) return clone(seed)
    return clone(seed.filter((t) => {
      if (filter.published !== undefined) return !!t.published === !!filter.published
      return true
    }))
  },

  async findOne(filter: any) {
    if (!filter) return null
    return clone(seed.find((t) => t.slug === filter.slug && (filter.published === undefined || !!t.published === !!filter.published)) || null)
  },

  async findOneAndUpdate(filter: any, update: any, opts: any) {
    const t = seed.find((x) => x.slug === filter.slug)
    if (!t) return null
    const set = update.$set || {}
    Object.assign(t, set)
    return clone(t)
  },

  async findOneAndDelete(filter: any) {
    const idx = seed.findIndex((x) => x.slug === filter.slug)
    if (idx === -1) return null
    const [deleted] = seed.splice(idx, 1)
    return clone(deleted)
  },

  async create(data: Partial<Tour>) {
    const doc: any = { _id: String(seed.length + 1), ...data }
    seed.push(doc as Tour)
    return clone(doc)
  },

  async insertMany(items: Partial<Tour>[]) {
    const docs = items.map((it, i) => ({ _id: String(seed.length + i + 1), ...it }))
    seed.push(...(docs as Tour[]))
    return clone(docs)
  },
}
