# backend/src/services

- Data access layer wrapping Prisma queries for users, tokens, accounts, etc.
- Keep functions small and side-effect free; return typed entities or `null`.
- Share services between server actions, API routes, and Auth callbacks instead of duplicating queries.
- Avoid instantiating Prisma here; import the shared client from `@backend/db/db`.
