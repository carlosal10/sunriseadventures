import Link from 'next/link';
import TourFormAction from '../tour-form-action';

export const dynamic = 'force-dynamic';

export default function NewTourPage() {
  return (
    <div className="space-y-8">
      <section className="premium-card p-7 md:p-10">
        <Link href="/admin/tours" className="btn-secondary mb-6 px-5 py-2">
          &lt; Back to tours
        </Link>
        <p className="eyebrow mb-4">New tour</p>
        <h1 className="display-title">Add a polished trip to the dynamic catalog.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#715f4e]">
          Once saved, this record becomes available to the admin list and can be published into the
          public catalog, detail page, booking flow, and API.
        </p>
      </section>

      <TourFormAction mode="create" />
    </div>
  );
}
