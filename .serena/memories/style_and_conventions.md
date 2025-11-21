# Style and conventions
- Language: TypeScript with `strict` + `strictNullChecks`, no emit. Use App Router patterns. Prefer typed objects/schemas (zod) and hook-form usage.
- Lint/format: ESLint (`next`, `next/core-web-vitals`, `prettier`). Prettier expected; follow Next.js/React best practices, no custom ESLint rules defined.
- Imports: path alias `@/*`; keep moduleResolution `bundler`. Keep tailwind classes consistent with defined palette; dark mode via `class` strategy.
- Styling: TailwindCSS with extensive custom theme (Satoshi font, rich spacing, custom colors like `primary #3C50E0`, `secondary #80CAEE`, gray palette). Animations and utilities from tailwind-merge/tailwindcss-animate; Radix UI components used for primitives.
- Security/auth: Auth.js NextAuth v5 beta via `next-auth` and `@auth/prisma-adapter`; middleware enforces auth. Use Prisma models per `prisma/schema.prisma` and protect routes; bcrypt/bcryptjs for password hashing.
- Misc: Dark/light support, Next.js image optimization; Resend email templates via `react-email`. No tests present; follow idiomatic Next.js component conventions and server actions folder `actions/` when adding API logic.
