# Architecture Overview

## Workspace Layout
- Root `package.json` uses npm workspaces: `frontend/` (Next.js app) and `backend/` (server-only code, Prisma).
- Husky hook runs `npm run lint:staged --workspace frontend`.
- `.gitignore` covers root/front/back node_modules, Next.js outputs, backend dist.

## Frontend (Next.js App Router)
- Located in `frontend/`; aliases `@/*` to frontend root and `@backend/*` to `../backend/src/*`.
- `next.config.js` uses `transpilePackages: ['backend']` for cross-workspace imports.
- Middleware (`frontend/middleware.ts`) uses edge-safe auth config from `@backend/auth/auth.config.edge`.
- Auth handler in `frontend/auth.ts` uses full NextAuth config for API routes.
- UI/routes in `frontend/app`, shared components in `frontend/components`, actions/hooks/lib/constants/types under matching folders.

## Backend (Server-Only)
- Located in `backend/`; Prisma schema in `backend/prisma/schema.prisma`.
- Server utilities in `backend/src/`:
  - `auth/`: `auth.config.ts` (full NextAuth with credentials/bcrypt/Prisma), `auth.config.edge.ts` (edge-safe middleware config), `tokens.ts`.
  - `db/`: Prisma client wrapper.
  - `email/`: Resend/mail logic and React Email templates (server-only).
  - `schemas/`: zod schemas.
  - `services/`: domain services for users/teachers/students/assignments/etc. Teacher services expect caller to pass `userId`.

## Environment Files
- Templates:
  - `frontend/.env.example`: `AUTH_SECRET`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_APP_URL`, `AUTH_TRUST_HOST`, optional OAuth keys.
  - `backend/.env.example`: `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `NEXTAUTH_SECRET`, `RESEND_API_KEY`.
- Real env files live per workspace (`frontend/.env` for Next.js runtime; `backend/.env` for Prisma/Resend). Keep auth secrets in sync; do not expose DB URLs with `NEXT_PUBLIC_`.

## Tooling & Scripts
- Root scripts delegate to workspaces (`build|lint|format` to frontend; `prisma:generate` to backend).
- Frontend scripts: `dev`, `build`, `lint`, `lint:staged`, `format`.
- Backend scripts: `build` (tsc), `prisma:generate`, `prisma:migrate`.
