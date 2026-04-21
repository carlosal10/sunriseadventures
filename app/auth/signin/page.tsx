import Link from 'next/link';
import SignInForm from './signin-form';

export default function AdminSignInPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <section className="premium-card overflow-hidden">
        <div className="bg-[#16372c] p-8 text-[#fffaf1] md:p-10">
          <p className="eyebrow mb-4 text-[#d8a04a]">Admin access</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-6xl">
            Keep the adventure polished from behind the curtain.
          </h1>
          <p className="mt-6 leading-7 text-white/75">
            Sign in to manage dynamic tours, guest booking requests, featured trips, and future
            content sections.
          </p>
        </div>

        <div className="p-6 text-sm leading-6 text-[#715f4e]">
          <p>Welcome</p>
        </div>
      </section>

      <section className="premium-card p-7 md:p-10">
        <p className="eyebrow mb-4">Studio sign-in</p>
        <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-[#21170f]">
          Welcome back.
        </h2>
        <p className="mt-4 leading-7 text-[#715f4e]">
          The public site stays calm and premium because this side keeps the details clean.
        </p>

        <div className="mt-8">
          <SignInForm />
        </div>

        <Link href="/" className="btn-secondary mt-5 w-full">
          &lt; Back to website
        </Link>
      </section>
    </div>
  );
}
