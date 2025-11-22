# backend/src/db

- Prisma client singleton (`db.ts`) shared across backend/frontend usage.
- Avoid creating new `PrismaClient` instances in routes/actions; import `@backend/db/db` instead.
- If adding extensions/middlewares, configure them here to keep a single source of truth.
