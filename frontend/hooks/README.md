# frontend/hooks

- Client-side React hooks shared across components.
- Keep hooks focused (one concern each) and return typed values.
- Avoid direct data fetching here; prefer SWR/fetch wrappers that can be shared.
- Reuse `@/lib` helpers and `@backend` services where appropriate.
