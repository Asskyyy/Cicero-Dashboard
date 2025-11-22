# backend/src/auth

- NextAuth configs (web + edge) and token helpers.
- `auth.config.ts` shapes signIn/session/jwt callbacks, injecting role/status and 2FA flags.
- `auth.config.edge.ts` mirrors config for middleware usage.
- Token helpers generate verification/two-factor tokens; keep lifetimes consistent with UI expectations.
- Keep auth logic centralized here to avoid duplicating role/status checks elsewhere.
