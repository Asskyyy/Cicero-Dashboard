# Project overview

- Purpose: Cicero Dashboard web app (Next.js App Router) with Auth.js, Prisma/PostgreSQL, Tailwind UI, Resend emails (2FA/verification), using template from Nextjs-SchoolManagementSystem.
- Stack: Next 14/React 18/TypeScript, Prisma 5 with PostgreSQL, Auth.js NextAuth beta, TailwindCSS + custom design tokens, Radix UI components, Zustand/SWR/react-hook-form/zod, Resend email + React Email, optional Firebase dependency present.
- Structure: top-level dirs include app (routes/layouts), components (UI widgets), hooks, lib (utils, auth providers), prisma (schema/migrations), public assets, constants/data/schemas/types, actions for server actions, middleware.ts for auth, next-auth.d.ts typings.
- Config: path alias `@/*` (tsconfig). ESLint extends `next`, `next/core-web-vitals`, `prettier`. Tailwind config defines custom colors spacing animations, darkMode class. Package name `nextj-sms`. No tests configured yet.
- Prereqs: Node LTS (18/20), npm, PostgreSQL (16/17 suggested), Git, VSCode. Environment from `.env.example` includes `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `NEXTAUTH_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_APP_URL`, `AUTH_TRUST_HOST`.
- Data: default database name in docs `nextjs_sms`; Admin user seeded manually via Prisma Studio with bcrypt password hash; roles include ADMIN/USER etc.
- Runtime: dev server on http://localhost:3000 with route `/auth/login`. Prisma client generated via migrate dev before running app.
