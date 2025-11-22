# Repair Roadmap (Priority)

## P0 — Immediate Repair (Security/Data Integrity)

### T0.1 API Must Add Login + Role Verification (Prevent Unauthorized Writes)

**Purpose**: Prevent unauthorized/unpermitted users from POSTing to the database.

**What Needs to be Changed**:

* All `POST/PUT/DELETE` routes should first check the session, then check the role.
* Reuse existing `currentUser/currentRole` or middleware guard.
* No session → Return `401`; Session exists but role does not match → Return `403`.

**Files Involved** (All of the same type):

* `frontend/app/api/lesson/route.ts`
* `frontend/app/api/assignment/route.ts`
* `frontend/app/api/schedule/route.ts`
* `frontend/app/api/classroom/route.ts`
* `frontend/app/api/user/route.ts`
* (If there are other `app/api/**/route.ts` files, scan them as well)

**Acceptance Criteria**:

* Not logged in: POST → 401
* Logged in but not an authorized role: POST → 403
* Authorized role: POST → 200/201 + Successful write
* The above three scenarios were detected using Postman/Playwright.

---

## P0 — Immediate Fix (Stability/Connection Overload)

### T0.2 Prisma client changed to singleton (avoid connection exhaustion)

**Purpose**: To avoid the DB connections overload caused by opening a new PrismaClient with each request.

**What to change**:

* Remove `new PrismaClient()` from each route's entry.
* Replace with a shared client (singleton) exported by `@backend/db/db`.

**Related Files**:

* All API routes (same as T0.1, all containing `new PrismaClient()`)

**Acceptance Criteria**:

* Search the repository: `new PrismaClient(` should only appear once in the backend/db wrapper.
* Stress testing (e.g., 50+ concurrent POSTs) should not result in `too many connections` or timeouts.
* Cold start time should decrease or at least not worsen.

---

## P1 — High Priority (functionality will break directly)

### T1.1 Correct Zod schema date/field validation syntax

**Purpose**: Correct schemas that are immediately thrown; ensure that the data entering the database has data type protection.

**What needs to be changed**:

* Change `z.string().date()` to the correct way, for example:
* `z.coerce.date()` or
* `z.string().datetime()` (depending on whether you are receiving an ISO string) Date)
* Complete missing field validation (`body.time`, `body.file`, etc.).
* Each route must parse/validate the input; a 400 error should be returned if it fails.

**Files Affected**:

* `frontend/app/api/assignment/route.ts`
* `frontend/app/api/schedule/route.ts`
* (Scan for similar schema patterns)

**Acceptance Criteria**:

* Normal payload → 200/201
* Incorrect payload (missing field / incorrect date format / unexpected time) → 400 + error message
* No more "throws immediately upon entering route".

---

## P1 — High Priority (Permission UI Error / Teacher Can't See Things)

### T1.2 Fixed RoleGate support for multiple roles + Dashboard allowedRole usage

**Purpose**: Teachers should see the teacher card, admin Seeing the admin card; it shouldn't always only recognize admin because of an enum OR usage error.

**What needs to be changed**:

1. Change `RoleGate` to accept arrays:
* `allowedRoles: UserRole[]`
* check `allowedRoles.includes(currentRole)`
2. Change `Dashboard.tsx` from:
* `allowedRole={UserRole.ADMIN || UserRole.TEACHER}`
to:
* `allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}`

**Files involved**:

* `frontend/components/auth/role-gate.tsx`
* `frontend/components/Dashboard/Dashboard.tsx`
* (Change any other places using RoleGate as well)

**Acceptance criteria**:

* admin login → Only admin should be seen. Gated cards should be visible
* Teacher logged in → Gated cards should be visible
* Other roles/not logged in → Gated cards not visible

---

## P2 — Middle Priority (UX/Route Correctness)

### T2.1 Middleware Check Order Adjustment

**Purpose**: Accessing the protected route without logging in should redirect to login, instead of randomly redirecting to `_error`.

**What needs to be changed**:

* Middleware flow changed to:
1. First check `isLoggedIn`
2. Then perform role/status rewrite
* Clearly define the protected path list.

**Files involved**:

* `frontend/middleware.ts`

**Acceptance criteria**:

* Accessing `/admin` `/teacher` `/student` without logging in → redirect to login
* Logged in but role mismatch → 403 or redirect to the appropriate page
* Anonymous access should no longer be rewritten. `/_error`.

---

## P3 — Finishing Touches/Strengthening (Optional, but Recommended)

### T3.1 Unified API Guard Helper

**Purpose**: To avoid copying/pasting guards for each route, reducing future missed checks.

**What to Change**:

* Create one in the backend or frontend server utils:
* `requireSession()`
* `requireRole(roles: UserRole[])`
* Use the same helper for all routes.

**Files Involved**:

* Add: `backend/src/auth/guards.ts` (or `frontend/lib/server/guards.ts`)
* Modify: All app/api routes

**Acceptance Criteria**:

* All protected route guards originate from the same source.
* The new route is easy to use and less prone to missed checks.

---

# Recommended Execution Order (Can be parallelized)

1. **T0.1 + 1. **T0.2 (Modify all API routes at once)**
2. **T1.1 (Schema fix to prevent API from crashing again)**
3. **T1.2 (RoleGate + Dashboard)**
4. **T2.1 (Middleware)**
5. **T3.1 (Refactor guard helper)**