import { listTours } from '../../../lib/data/tours.repo';
import ToursGrid from './tours-grid';
import ToursEmptyState from './tours-empty-state';

export const dynamic = 'force-dynamic';

export default async function ToursPage() {
  try {
    const tours = await listTours();

    return <ToursGrid tours={tours} />;
  } catch (error) {
    console.error('Failed to load tours page:', error);

    return (
      <div className="space-y-16">
        <section className="grid gap-8 rounded-[2.5rem] border border-white/70 bg-[#fffaf1]/70 p-6 shadow-[0_24px_80px_rgba(63,41,22,0.1)] md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="eyebrow mb-4">Tour collection</p>
            <h1 className="display-title">Choose the trip that matches your pace.</h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#715f4e] lg:justify-self-end">
            The live tour database is temporarily unavailable, so we cannot load trip details right
            now.
          </p>
        </section>

        <ToursEmptyState
          title="Tours are temporarily unavailable."
          message="Please try again shortly. If you need help immediately, contact the team and we will help you plan directly."
          actionHref="/contact"
          actionLabel="Contact the Team"
        />
      </div>
    );
  }
}
