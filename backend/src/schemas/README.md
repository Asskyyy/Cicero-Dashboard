# backend/src/schemas

- Shared zod schemas for auth/forms to keep validation consistent across server actions and UI.
- Reuse schemas in routes, actions, and auth providers instead of redefining shapes.
- Keep schemas narrow and composable; surface friendly error messages.
