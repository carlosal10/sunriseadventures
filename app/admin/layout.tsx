// app/admin/layout.tsx
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[240px_1fr] min-h-screen">
      <aside className="border-r p-4 space-y-4">
        <h2 className="font-bold text-xl">Admin</h2>
        <nav className="flex flex-col space-y-2">
          <a href="/admin/tours" className="text-blue-600">
            Tours
          </a>
          {/* future: bookings, users, etc */}
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
