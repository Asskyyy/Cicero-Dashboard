# Suggested commands

- Check tooling: `node -v`, `npm -v`, `git --version`.
- Install deps: `npm install` (after clone).
- Env setup: copy `.env.example` to `.env` and fill `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `NEXTAUTH_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_APP_URL`, `AUTH_TRUST_HOST=true`.
- Prisma schema sync: `npx prisma migrate dev --name init` (or new migration name). Inspect data: `npx prisma studio`.
- Run dev server: `npm run dev` (default http://localhost:3000/auth/login).
- Build/start: `npm run build` then `npm run start`.
- Lint: `npm run lint`.
- Generate password hash for admin seeding: `node -e "console.log(require('bcryptjs').hashSync('YourPassword123', 10))"` then paste into Prisma Studio User record.
