import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ToursPage from '../app/(site)/tours/page'
import { mockTourModel } from '../lib/db/mockTourModel'

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

test('renders an empty state when no tours are live', async () => {
  const page = await ToursPage()
  const html = renderToStaticMarkup(page)

  expect(html).toContain('Choose the trip that matches your pace')
  expect(html).toContain('No tours are live right now.')
})
