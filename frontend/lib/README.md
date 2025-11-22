# frontend/lib

- Utilities, providers, and auth helpers shared across the app.
- Route constants live in `routes.ts`; import via `@/routes`.
- Prefer pure functions and stateless helpers; avoid React client code here.
- Use this layer for shared config (e.g., axios, auth wrappers) instead of duplicating logic in routes.
