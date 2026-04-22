import Link from 'next/link';

type Props = {
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function ToursEmptyState({ title, message, actionHref, actionLabel }: Props) {
  return (
    <section className="premium-card border-dashed p-10 text-center">
      <p className="eyebrow mb-4">Tour collection</p>
      <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-[#21170f]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#715f4e]">{message}</p>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="btn-primary mt-6">
          {actionLabel}
        </Link>
      )}
    </section>
  );
}
