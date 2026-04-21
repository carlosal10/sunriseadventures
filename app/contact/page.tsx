import Link from 'next/link';

const contactCards = [
  {
    title: 'Call or WhatsApp',
    value: '+254 118706567',
    href: 'https://wa.me/254118706567',
  },
  {
    title: 'Bookings',
    value: 'bookingsunrisetours@gmail.com',
    href: 'mailto:bookingsunrisetours@gmail.com',
  },
  {
    title: 'Office base',
    value: 'Nairobi, Kenya',
    href: '/tours',
  },
];

export default function Contact() {
  return (
    <div className="space-y-14 py-8">
      <section className="grid gap-8 rounded-[2.5rem] bg-[#16372c] p-7 text-[#fffaf1] shadow-[0_28px_90px_rgba(22,55,44,0.22)] md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow mb-4 text-[#d8a04a]">Concierge planning</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
            Tell us the trip you want. We will shape it properly.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#f7ead4]/75">
            Share the destination, group size, date, or budget. Our team will help you refine the
            route, logistics, and experience style.
          </p>
        </div>

        <div className="grid gap-4 self-end">
          {contactCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur transition hover:bg-white/12"
            >
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d8a04a]">
                {card.title}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold">{card.value}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="premium-card space-y-5 p-7 md:p-10">
          <div>
            <p className="eyebrow mb-3">Send a note</p>
            <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em]">
              Start the conversation.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-bold text-[#715f4e]">
              Name
              <input className="form-control" placeholder="Your name" />
            </label>
            <label className="space-y-2 text-sm font-bold text-[#715f4e]">
              Email
              <input className="form-control" placeholder="you@example.com" type="email" />
            </label>
          </div>

          <label className="space-y-2 text-sm font-bold text-[#715f4e]">
            Message
            <textarea
              className="form-control"
              placeholder="Tell us where you want to go, your group size, and your preferred date."
              rows={6}
            />
          </label>

          <button type="button" className="btn-primary">
            Send Inquiry
          </button>
        </form>

        <aside className="premium-card flex flex-col justify-between bg-[#fffaf1]/85 p-7 md:p-10">
          <div>
            <p className="eyebrow mb-3">How we respond</p>
            <h3 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em]">
              Clear planning, no guesswork.
            </h3>
          </div>

          <div className="mt-10 space-y-5">
            {[
              'We confirm your target date, group size, and budget.',
              'We recommend a polished route and activity structure.',
              'We share next steps for reservation, payment, and pickup details.',
            ].map((item, index) => (
              <div key={item} className="flex gap-4 border-t border-[#21170f]/10 pt-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#16372c] text-sm font-bold text-[#f0bd6b]">
                  {index + 1}
                </span>
                <p className="leading-7 text-[#715f4e]">{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
