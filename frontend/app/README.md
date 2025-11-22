# frontend/app

- Next.js App Router entry point (layouts, pages, API routes).
- `layout.tsx` wires global providers/styles; `(protected)` holds authenticated areas.
- Public routes: `/` landing, auth flow under `/auth/*`.
- API routes live in `app/api/*` and currently use route handlers.
- Middleware enforces auth/role gating; see `frontend/middleware.ts`.
- Keep server components in route files; prefer client components only when needed for hooks/state.
- Co-locate route-specific UI under the matching route folder.
- Favor `@/*` imports to keep paths short; avoid deep relative paths.
