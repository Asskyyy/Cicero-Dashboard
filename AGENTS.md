# Repository Guidelines

## Project Structure & Modules

- `app/` Next.js App Router routes, layouts, and server components.
- `actions/` server actions for mutations and auth flows.
- `components/` shared UI (Radix-based), with supporting `constants/`, `data/`, `schemas/`, and `types/`.
- `lib/` utilities, auth helpers, client providers; `routes.ts` centralizes route constants.
- `prisma/` schema and migrations; `public/` static assets; `middleware.ts` handles auth gating.

## Setup & Environment

- Copy `.env.example` to `.env`; set `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `NEXTAUTH_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_APP_URL`, `AUTH_TRUST_HOST=true`.
- Use Node 18/20 and PostgreSQL 16/17. Generate Prisma client before running the app.

## Build, Test, and Development Commands

- `npm install` install dependencies.
- `npm run dev` start the dev server at http://localhost:3000/auth/login.
- `npm run lint` check lint rules; `npm run lint:fix` auto-fixes.
- `npm run build` production build; `npm run start` serve built app.
- `npm run format` apply Prettier; `npm run format:check` verify formatting.
- `npx prisma migrate dev --name <msg>` create/apply migration; `npx prisma studio` inspect/edit data.

## Coding Style & Naming

- TypeScript strict mode; prefer typed props/returns and zod schemas for validation.
- ESLint (`next`, `next/core-web-vitals`, `prettier`) and Prettier govern style; Husky + lint-staged run on commit.
- Use `@/*` import alias; prefer functional components, server actions in `actions/`, hooks in `hooks/`.
- Tailwind with custom theme (e.g., `primary` #3C50E0); keep class order logical and avoid inline styles when utilities exist.
- Names: PascalCase components, camelCase variables/functions, SCREAMING_SNAKE_CASE constants.

## Testing Guidelines

- No automated tests yet; at minimum run `npm run lint` before pushing.
- For new features, add component/route-level checks manually (screenshots, accessibility checks). If adding tests later, mirror route names (e.g., `auth/login`) in test titles.

## Commit & Pull Request Guidelines

- Follow conventional-ish commit prefixes seen in history (`chore: ...`, `feat: ...`, `fix: ...`); keep messages imperative and scoped.
- PRs should describe scope, linked issue/story, migration impact, and include UI screenshots for visual changes.
- Ensure `.env` updates are documented, Prisma migrations included, and lint/format pass. Avoid committing generated `.next/` or environment files.

## Security & Configuration Tips

- Protect secrets: never commit `.env`; rotate keys if leaked.
- Run migrations only against intended database; verify `DATABASE_URL` before `prisma migrate`.
- Keep Auth.js secrets and Resend keys set in production; ensure middleware stays aligned with protected routes.
