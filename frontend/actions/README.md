# frontend/actions

- Server actions for mutations/auth flows; run on the server only.
- Pattern: validate with zod -> read/write via backend services -> return shaped result.
- Avoid throwing for expected user errors; return `{ error: string }` or `{ success: string }`.
- Keep side effects (emails, tokens) here, but delegate DB work to backend services.
- Use `@/*`/`@backend/*` aliases instead of deep relative imports.
- Ensure actions remain stateless and idempotent where possible.
