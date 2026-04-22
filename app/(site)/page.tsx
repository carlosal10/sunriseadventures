import Link from 'next/link';
import Image from 'next/image';
import HomeHeroSlideshow from '../components/HomeHeroSlideshow';
import { listFeaturedTours } from '../../lib/data/tours.repo';
import ToursEmptyState from './tours/tours-empty-state';

export const dynamic = 'force-dynamic';

const experiences = [
  { name: 'Forest Hikes', image: '/images/hiking.jpg', note: 'Guided trail days' },
  { name: 'Coastal Escapes', image: '/images/coastal.jpg', note: 'Warm beaches and slow mornings' },
  { name: 'Camping', image: '/images/camping.jpg', note: 'Bonfires, tents, and clear skies' },
  { name: 'Game Drives', image: '/images/destination-kenya.jpg', note: 'Wildlife, plains, and golden light' },
];

const promises = [
  {
    title: 'Designed, not thrown together',
    text: 'Every route, meal stop, activity, and timing decision is planned to make the day feel calm and premium.',
  },
  {
    title: 'A social trip that still feels polished',
    text: 'You get the warmth of a group adventure without the confusion that makes trips feel reckless.',
  },
  {
    title: 'Local knowledge, trusted partners',
    text: 'We coordinate guides, transport, venues, and guest support so your only job is to show up ready.',
  },
];

export default async function Home() {
  let featuredTours = [];
  let toursUnavailable = false;

  try {
    featuredTours = await listFeaturedTours(6);
  } catch (error) {
    toursUnavailable = true;
    console.error('Failed to load featured tours:', error);
  }

  return (
    <div className="space-y-24">
      <HomeHeroSlideshow />

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="eyebrow mb-3">Upcoming departures</p>
          <h2 className="display-title">Trips with presence, polish, and a clear plan.</h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-[#715f4e] lg:justify-self-end">
          These are not random weekend plans. Each departure is shaped around comfortable movement,
          memorable scenery, clear communication, and a hosted experience from first message to
          final drop-off.
        </p>
      </section>

      {featuredTours.length > 0 ? (
        <section className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour, index) => (
            <article
              key={tour.slug}
              className={`premium-card group overflow-hidden ${
                index === 0 ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.05fr_0.95fr]' : ''
              }`}
            >
              <div
                className={`${index === 0 ? 'h-80 lg:h-full' : 'h-64'} relative overflow-hidden`}
              >
                <Image
                  src={tour.heroImage}
                  alt={tour.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-[#fffaf1]/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#16372c]">
                  {tour.dateLabel}
                </span>
              </div>

              <div className="flex min-h-72 flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="eyebrow mb-3">{tour.location}</p>
                  <h3 className="font-display text-3xl font-semibold leading-none tracking-[-0.035em] text-[#21170f]">
                    {tour.title}
                  </h3>
                  <p className="mt-4 leading-7 text-[#715f4e]">{tour.summary}</p>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#21170f]/10 pt-5">
                  <span className="font-bold text-[#b86232]">{tour.priceLabel}</span>
                  <Link href={`/tours/${tour.slug}`} className="btn-secondary px-5 py-2">
                    View Trip
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <ToursEmptyState
          title={toursUnavailable ? 'Tours are temporarily unavailable.' : 'No featured tours are live yet.'}
          message={
            toursUnavailable
              ? 'We could not load the live tour database right now. Please try again shortly or contact the team directly.'
              : 'The admin team has not featured any tours yet. New trips will appear here as soon as they are published.'
          }
          actionHref="/contact"
          actionLabel="Contact the Team"
        />
      )}

      <section className="grid gap-8 rounded-[2.5rem] bg-[#16372c] p-6 text-[#fffaf1] shadow-[0_28px_90px_rgba(22,55,44,0.25)] md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col justify-between">
          <div>
            <p className="eyebrow mb-4 text-[#d8a04a]">Experience styles</p>
            <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] md:text-6xl">
              Choose the mood, we handle the movement.
            </h2>
          </div>
          <Link href="/tours" className="btn-primary mt-8 w-fit">
            See All Tours
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {experiences.map((experience) => (
            <div key={experience.name} className="group relative h-56 overflow-hidden rounded-[1.75rem]">
              <Image
                src={experience.image}
                alt={experience.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160f0a]/75 via-[#160f0a]/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-display text-3xl font-semibold leading-none">{experience.name}</p>
                <p className="mt-2 text-sm text-white/75">{experience.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow mb-3">The difference</p>
          <h2 className="display-title">A smoother way to adventure.</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {promises.map((item, index) => (
            <div key={item.title} className="premium-card p-7">
              <span className="mb-7 grid h-12 w-12 place-items-center rounded-full bg-[#16372c] font-display text-2xl text-[#f0bd6b]">
                {index + 1}
              </span>
              <h3 className="font-display text-2xl font-semibold leading-none text-[#21170f]">
                {item.title}
              </h3>
              <p className="mt-4 leading-7 text-[#715f4e]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[2.5rem] bg-[#b86232] p-8 text-white shadow-[0_24px_80px_rgba(184,98,50,0.24)] md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow mb-4 text-[#ffdf9b]">Ready when you are</p>
            <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] md:text-6xl">
              Let us shape your next escape properly.
            </h2>
            <p className="mt-5 max-w-2xl text-white/80">
              Tell us the destination, group size, or vibe you want. We will help turn it into a
              trip that feels intentional, safe, and worth dressing up for.
            </p>
          </div>
          <Link href="/contact" className="btn-secondary bg-white text-[#21170f]">
            Start Planning
          </Link>
        </div>
      </section>
    </div>
  );
}
