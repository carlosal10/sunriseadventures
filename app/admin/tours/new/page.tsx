// app/admin/tours/new/page.tsx

type TourFormActionProps = { mode: 'create' | 'edit' };

function TourFormAction({ mode }: TourFormActionProps) {
  return (
    <form>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {mode === 'create' ? 'Create Tour' : 'Save Changes'}
      </button>
    </form>
  );
}

export default function NewTourPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">New Tour</h1>
      <TourFormAction mode="create" />
    </div>
  );
}
