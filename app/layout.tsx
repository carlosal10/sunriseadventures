import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Sunrise Tours & Adventure',
  description: 'Explore curated tours, safaris, and travel experiences',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
