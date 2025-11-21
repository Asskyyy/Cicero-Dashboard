import type { NextAuthConfig } from 'next-auth';
import { UserRole, UserStatus } from '@prisma/client';

// Edge-safe NextAuth configuration for middleware.
// Avoids importing any Node-only dependencies (Prisma, bcrypt, Prisma client, etc.).
const authEdgeConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: [],
  callbacks: {
    async jwt({ token }) {
      // Rely on claims issued by the full auth config; nothing edge-unsafe here.
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        if (token.role) session.user.role = token.role as UserRole;
        if (token.status) session.user.status = token.status as UserStatus;
        if (typeof token.isTwoFactorEnabled !== 'undefined') {
          session.user.isTwoFactorEnabled = Boolean(token.isTwoFactorEnabled);
        }
        if (token.name) session.user.name = token.name;
        if (token.email) session.user.email = token.email;
        session.user.isOAuth = Boolean(token.isOAuth);
      }

      return session;
    },
  },
};

export default authEdgeConfig;
export { authEdgeConfig };
