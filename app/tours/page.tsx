import React from 'react';
import ToursGrid from './tours-grid';

interface Tour {
  id: string;
  short: string;
  title: string;
  heroImage: string;
  video: string;
  date: string;
  location: string;
  price: string;
  mapEmbed: string;
  description: string;
  highlights: string[];
  gallery: string[];
  includes: string[];
  excludes: string[];
  availability: Array<{ date: string; status: string }>;
  testimonials: Array<{ name?: string; image?: string; text: string }>;
}

const tours: Record<string, Tour> = {
  'safari-rally-edition': {
    id: 'safari-rally-edition',
    short: 'Safari Rally',
    title: 'Safari Rally Edition',
    heroImage: '/images/safari-rally/1.jpg',
    gallery: [
      '/images/safari-rally/1.jpg',
      '/images/safari-rally/2.jpg',
      '/images/safari-rally/3.jpg',
      '/images/safari-rally/4.jpg',
    ],
    video: '',
    date: '20th March 2026',
    location: 'Nairobi – Naivasha – Narok',
    price: 'KES 3,500',
    mapEmbed: 'https://www.google.com/maps?q=Naivasha%20Kenya&output=embed',
    description: `Experience the thrill of the World Rally Championship (WRC) Safari Rally Kenya with Sunrise Tours & Adventure in Naivasha.`,
    highlights: [
      'Transport to and from Nairobi to Naivasha',
      'WRC Safari Rally access',
      'Guided tour of rally stages',
      'Professional photography',
      'Meals and refreshments',
    ],
    includes: ['Return transport', 'Professional guide', 'Entry fees'],
    excludes: ['Meals', 'Personal expenses'],
    availability: [{ date: '14 - 15 Mar 2026', status: 'Available' }],
    testimonials: [],
  },
};

export default function ToursPage() {
  return <ToursGrid tours={tours} />;
}
