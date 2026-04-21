import Link from 'next/link';
import Image from 'next/image';
import HomeHeroSlideshow from './components/HomeHeroSlideshow';
import { listFeaturedTours } from '../lib/domain/tours';

export default function Home() {
  const featuredTours = listFeaturedTours(6);

  return (
    <div className="space-y-20">
      <HomeHeroSlideshow />

      <section>
        <h2 className="mb-6 text-3xl font-bold">Upcoming Tours</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour) => (
            <article
              key={tour.slug}
              className="overflow-hidden rounded-xl border shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-48">
                <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" />
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <h3 className="text-xl font-semibold">{tour.title}</h3>
                  <p className="text-sm text-gray-500">{tour.location}</p>
                </div>

                <p className="text-sm text-gray-600">{tour.summary}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-sm">
                  <span className="font-semibold text-orange-600">{tour.dateLabel}</span>
                  <span className="font-semibold text-orange-600">{tour.priceLabel}</span>
                </div>

                <Link
                  href={`/tours/${tour.slug}`}
                  className="inline-block text-sm font-medium text-orange-600"
                >
                  View details -&gt;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-gray-50 p-10">
        <h2 className="mb-6 text-3xl font-bold">Our Popular Tours</h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { name: 'Hikes', image: '/images/hiking.jpg' },
            { name: 'Coastal', image: '/images/coastal.jpg' },
            { name: 'Camping', image: '/images/camping.jpg' },
            { name: 'Game Drives', image: '/images/destination-kenya.jpg' },
          ].map((destination) => (
            <div key={destination.name} className="relative h-40 overflow-hidden rounded-xl">
              <Image src={destination.image} alt={destination.name} fill className="object-cover" />
              <div className="absolute inset-0 flex items-end bg-black/40 p-3">
                <span className="font-semibold text-white">{destination.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold">Why Choose Sunrise Travel and Adventure</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: 'Authentic Kenyan Adventures',
              text: 'Every journey is tailored to your interests, budget, and schedule.',
            },
            {
              title: 'Personalized and Flexible Trips',
              text: 'We work with trusted hotels, guides, and transport providers.',
            },
            {
              title: 'Memorable Group Experiences',
              text: 'From planning to return, our team supports you every step of the way.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border p-6">
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-orange-600 p-10 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Join Us on the Next Tour</h2>
        <p className="mb-6 text-orange-100">
          Let Sunrise Travel and Adventure design your next unforgettable experience.
        </p>
        <Link
          href="/tours"
          className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-orange-600"
        >
          Book a Tour
        </Link>
      </section>
    </div>
  );
}
