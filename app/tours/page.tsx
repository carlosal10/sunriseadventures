import { listPublishedTours } from '../../lib/domain/tours';
import ToursGrid from './tours-grid';

export default function ToursPage() {
  return <ToursGrid tours={listPublishedTours()} />;
}
