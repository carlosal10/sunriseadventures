# Copilot / AI Agent Instructions

Purpose: quickly orient an AI contributor to make safe, high-impact changes in this Next.js + TypeScript project.

- **Project type:** Next.js 14 (App Router) + TypeScript + Tailwind. Entry UI lives under `app/` and server API routes appear in both `app/.../api/route.ts` and `api/`.
- **Key scripts:** `npm run dev`, `npm run build`, `npm start`, `npm test` (see [package.json](package.json)).

Architecture highlights
- **Routing / pages:** UI pages and nested routes are under [app/](app). Server components and route handlers live alongside pages (e.g. [app/tours/[slug]/page.tsx](app/tours/[slug]/page.tsx)).
- **Data layer:** repository wrappers are in [lib/data/*.repo.ts](lib/data). These abstract DB vs mock behavior (example: [lib/data/tours.repo.ts](lib/data/tours.repo.ts)).
- **DB connection:** connection helper is [lib/db/mongoose.ts](lib/db/mongoose.ts). If `MONGODB_URI` is missing, code intentionally returns `null` during build to avoid throwing. Use `MONGODB_URI` to enable real DB behavior.
- **Mock models:** When no DB is configured, code uses in-memory mock models in [lib/db/mockTourModel.ts](lib/db/mockTourModel.ts) and [lib/db/mockBookingModel.ts](lib/db/mockBookingModel.ts). Tests and dev without a DB rely on these.
- **Domain vs persistence:** Domain data is defined in [lib/domain/tours.ts](lib/domain/tours.ts). If adding fields, update domain → mock model → Mongoose model → repo functions.

Conventions & patterns to follow
- Prefer changing the repo layer (`lib/data/*.repo.ts`) for data access changes; UI pages call these functions. See `listTours()` and `getTour()` patterns in [lib/data/tours.repo.ts](lib/data/tours.repo.ts).
- Keep server-side DB calls behind `connectDB()`; avoid requiring a DB at build time. Do not throw during build (mimic existing check in [lib/db/mongoose.ts](lib/db/mongoose.ts)).
- When adding a new Tour field, update these places together: `lib/domain/tours.ts`, `lib/db/mockTourModel.ts`, `lib/db/models/Tour.ts` (Mongoose schema), and the repo functions in `lib/data`.
- Admin UI and API: admin pages are under [app/admin](app/admin) and admin API helpers under [api/admin/tours/route.ts](api/admin/tours/route.ts). Follow existing form/action patterns shown in [app/admin/tours/tour-form-action.tsx](app/admin/tours/tour-form-action.tsx).

Testing & dev
- Tests run with `npm test` (Jest). Test files live in `__tests__/` and some API route tests under `api/` (e.g. `api/tours/route.test.ts`).
- To run locally without MongoDB: leave `MONGODB_URI` unset—the app uses mock models.
- To test with a real DB: set `MONGODB_URI` in env before `npm run dev` or test runs. Seed helper: [scripts/seed.ts](scripts/seed.ts) shows example seed data.

Non-obvious behaviors to watch for
- The code toggles between real Mongoose models and in-memory mocks using `HAS_DB = Boolean(process.env.MONGODB_URI)` in repo files.
- `connectDB()` intentionally returns `null` in non-production builds when no URI is present; avoid introducing code paths that assume a connection at import time.

Good-first tasks for an AI
- Fix or add a field: update domain → mock model → Mongoose schema → repo → UI.
- Add or refactor an API route: follow existing handlers in `api/` and `app/.../api/route.ts` files.
- Improve tests: look at `__tests__/` to mimic existing jest patterns and the mock model usage.

When in doubt
- Run the app in dev (`npm run dev`) and the tests (`npm test`). Inspect `lib/data/tours.repo.ts`, `lib/db/*`, and UI route files under `app/tours` to understand the data flow.

If something's missing or unclear, ask for a short example change (e.g., "Add `duration` to Tour and wire UI + repo") and I'll update these instructions with concrete code steps.
