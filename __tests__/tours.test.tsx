import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ToursPage from '../app/(site)/tours/page'

test('renders the tours page with featured trips', async () => {
  const page = await ToursPage()
  const html = renderToStaticMarkup(page)

  expect(html).toContain('Choose the trip that matches your pace')
  expect(html).toContain('Tigoni Experience')
  expect(html).toContain('Safari Rally Edition')
})
