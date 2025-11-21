# Task completion checklist
- Ensure `.env` is present with valid database + auth + Resend values; run `npx prisma migrate dev` if schema changed.
- Run quality checks: `npm run lint`; optionally `npm run build` to verify Next.js compilation.
- If database-affecting changes, verify with `npx prisma studio` or seed scripts and confirm migrations committed.
- For auth/email changes, confirm Resend sender config (sandbox vs verified domain) and update `mail.ts` sender if needed.
- After changes, restart `npm run dev` or `npm run start` to ensure middleware/auth flows work. Provide admin credentials updates if login flow impacted.
