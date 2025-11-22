# frontend/components

- Shared UI components built with Tailwind + Radix primitives.
- Feature-specific subfolders (e.g., `Dashboard`) live here for reuse across routes.
- Keep components presentational; push data fetching to server components or hooks.
- Use `className` composition via tailwind-merge/clsx; avoid inline styles when utilities exist.
- Prefer typed props and minimal side effects; mark with `'use client'` only when hooks/state are required.
- Co-locate story/docs as needed; keep tests/docs lightweight.
