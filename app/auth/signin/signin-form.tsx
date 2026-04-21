'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FeedbackState = {
  kind: 'error' | 'success';
  message: string;
} | null;

export default function SignInForm() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setFeedback({
          kind: 'error',
          message: payload.message || 'Sign-in failed.',
        });
        return;
      }

      setFeedback({ kind: 'success', message: 'Signed in. Opening the studio...' });
      router.push('/admin');
      router.refresh();
    } catch (error) {
      console.error(error);
      setFeedback({ kind: 'error', message: 'Sign-in failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block space-y-2">
        <span className="text-sm font-bold text-[#21170f]">Username</span>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="form-control"
          placeholder="Optional unless configured"
          autoComplete="username"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-bold text-[#21170f]">Password</span>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          className="form-control"
          placeholder="Admin password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>

      {feedback && (
        <div
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
            feedback.kind === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {feedback.message}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
        {isSubmitting ? 'Signing in...' : 'Enter Admin Studio'}
      </button>
    </form>
  );
}
