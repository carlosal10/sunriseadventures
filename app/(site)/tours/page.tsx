import { listTours } from '../../../lib/data/tours.repo';
import ToursGrid from './tours-grid';

export const dynamic = 'force-dynamic';

export default async function ToursPage() {
  const tours = await listTours();

  return <ToursGrid tours={tours} />;
}
