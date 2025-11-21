# **Cicero Dashboard — Local Development Setup Guide**

Cicero Dashboard is a full-stack school management platform built with **Next.js 14**, **PostgreSQL**, **Prisma ORM**, **Auth.js (NextAuth v5)**, and **Resend** for email-based authentication.

This document provides a complete step-by-step guide for setting up the project from scratch on a local Windows environment.

---

# 1. **System Requirements**

- Windows 10 / 11
- **Node.js LTS** (v18+ or v20 recommended)
- **npm** (comes with Node.js)
- **Git** for cloning
- **PostgreSQL 16/17** + pgAdmin
- VSCode (recommended)

---

# 2. **Clone the Repository**

Choose a development folder, e.g.:

```
F:\Develop\GitHub\
```

Clone the repository:

```bash
git clone <your-repo-url>
cd <repo-folder>
```

Install dependencies:

```bash
npm install
```

---

# 3. **Install PostgreSQL + pgAdmin**

Download the official EDB installer:

[https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)

During installation:

1. Select **PostgreSQL Server** and **pgAdmin 4**
2. Set a **superuser password** (remember this)
3. Use default port: **5432**
4. Ignore Stack Builder when it appears after installation

---

# 4. **Create the Local Database**

Open **pgAdmin 4** → Connect using your postgres password.

Create database:

1. Expand **Servers → PostgreSQL XX → Databases**
2. Right-click → **Create → Database**
3. Enter:

```
nextjs_sms
```

Save.

---

# 5. **Environment Variables (.env)**

Create `.env` in the project root:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/nextjs_sms?schema=public"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/nextjs_sms?schema=public"

AUTH_SECRET="your-64-char-random-string"
NEXTAUTH_SECRET="your-64-char-random-string"
AUTH_TRUST_HOST="true"

RESEND_API_KEY="re_xxxxxxxxxxxxxx"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

To generate a random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Important:** Restart dev server after modifying `.env`.

---

# 6. **Initialize the Database Schema**

Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

You should see:

```
Your database is now in sync with your schema.
```

To inspect the database in a GUI:

```bash
npx prisma studio
```

---

# 7. **Create an Admin User (Required Before Login)**

Open Prisma Studio:

```bash
npx prisma studio
```

Go to **User** table → Add Record:

| Field              | Value                                         |
| ------------------ | --------------------------------------------- |
| name               | Admin                                         |
| email              | [admin@example.com](mailto:admin@example.com) |
| password           | bcrypt hash (see below)                       |
| role               | ADMIN                                         |
| status             | ACTIVE                                        |
| gender             | UNKNOW                                        |
| isTwoFactorEnabled | false                                         |

Generate a bcrypt password:

```bash
npm install bcryptjs
node -e "console.log(require('bcryptjs').hashSync('YourPassword123', 10))"
```

Paste the output into the `password` field.

Save.

---

# 8. **Configure Email (Resend)**

Cicero Dashboard uses Resend for:

- Email verification
- Two-factor codes
- Login confirmation

You have two options:

---

## **Option A — Fastest (Recommended for Local Development)**

Use Resend sandbox senders — no domain verification required.

Modify `lib/mail.ts`:

```ts
from: "Cicero <onboarding@resend.dev>",
```

OR:

```ts
from: "Cicero <delivered@resend.dev>",
```

---

## **Option B — Production Setup**

If you want to use:

```
noreply@yourdomain.com
```

You **must verify the domain** in Resend:

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Add your domain (e.g., `ixuapps.online`)
3. Add the DNS records (TXT/MX/CNAME)
4. Wait for verification
5. Use your custom sender address

If domain is not verified, Resend will return:

```
"The <domain> is not verified."
```

---

# 9. **Run the Development Server**

Start the app:

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

Log in with:

- Email: `admin@example.com`
- Password: your chosen password

You should now access the **Cicero Dashboard**.

---

# 10. **Common Errors & Fixes**

### ❌ **P1013: Invalid database string**

- `.env` contains BOM or invalid characters
- Wrong password
- Missing `?schema=public`
- Password contains special characters → URL encode required
  (`@` → `%40`, `!` → `%21`, etc.)

---

### ❌ **P1012: directUrl is empty**

Your schema has:

```prisma
directUrl = env("DIRECT_URL")
```

So `.env` **must** include a non-empty `DIRECT_URL`.

---

### ❌ **Missing API Key (Resend)**

Add:

```env
RESEND_API_KEY="re_xxxxx"
```

Restart server.

---

### ❌ **Domain not verified**

Switch to:

```ts
from: 'Cicero <onboarding@resend.dev>';
```

---

### ❌ **Token does not exist**

Email verification token expired or overwritten by new login attempt.

Solution: Login again and use the latest email link.

---

### ❌ **UntrustedHost / MissingSecret**

Add:

```env
AUTH_SECRET="xxxx"
AUTH_TRUST_HOST="true"
```

---

# 11. **Project Technologies**

- **Next.js 14 / React Server Components**
- **Prisma ORM**
- **PostgreSQL**
- **Auth.js (NextAuth v5)**
- **Resend Email API**
- **TailwindCSS**
- **TypeScript**

---

# 12. **Summary**

This README covers:

✔ Environment setup
✔ PostgreSQL installation
✔ Database creation
✔ Prisma migration
✔ Admin user creation
✔ Email verification options
✔ Authentication configuration
✔ Full login flow
✔ All major troubleshooting cases

With this setup, you can now fully operate **Cicero Dashboard** locally and continue development smoothly.
