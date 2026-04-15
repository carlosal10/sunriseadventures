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
  'Lalanasi Lodge Trip': {
    id: 'lalanasi-lodge-trip',
    short: 'Lalanasi Lodge Trip',
    title: 'Lalanasi Trip',
    heroImage: '/images/tour-island.jpg',

    video: '', // optional
    date: '4th may 2026',
    location: 'Lalanasi & Thompsons',
    price: 'KES 4,000',
    mapEmbed: 'https://maps.app.goo.gl/m3JkXjQnPFfzLZXd6=embed',
    description: `Escape the busy city life and immerse yourself in the cool, green landscapes of Tigoni.
This one-day farm and countryside experience blends nature walks, relaxation, light adventure,
and breathtaking scenery — perfect for friends, couples, and solo explorers.`,
    highlights: [
      'Transport To & From',
      'Photography',
      'Team Building',
      'Scenic hike',
      'QuadBike Experience',
      'Swimming',
      'Thompsons fall chase',
      'Lunch',
      'Farm Tour',
    ],
    gallery: [
      '/images/lalanasi/1.jpg',
      '/images/lalanasi/2.jpg',
      '/images/lalanasi/3.jpg',
      '/images/lalanasi/4.jpg',
       '/images/lalanasi/5.jpg',
      '/images/lalanasi/6.jpg',
    ],
    includes: ['Return transport', 'Lunch', 'Professional guide', 'Entry fees'],
    excludes: ['Personal expenses'],
    availability: [{ date: '4 May 2026', status: 'Available' }],
    testimonials: [
      {
        name: 'Owuor Timon.',
        image: '/images/people/1.jpg',
        text: 'Peaceful, Fun, refreshing and very well organised.',
      },
    ],
  },
};
export default function ToursPage() {
  return <ToursGrid tours={tours} />;
}
