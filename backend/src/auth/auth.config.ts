import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import Github from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import { db } from '@backend/db/db';
import { LoginSchema } from '@backend/schemas';
import { getUserByEmail, getUserById } from '@backend/services/user';
import { getTwoFactorConfirmationByUserId } from '@backend/services/two-factor-confirmation';
import { getAccountByUserId } from '@backend/services/account';
import { UserStatus, UserRole } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

export default {
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    Credentials({
      async authorize(credentials) {
        const { compare } = await import('bcryptjs');
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

      const userId = user?.id;
      if (!userId) return false;

      const existingUser = await getUserById(userId);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        // Require a fresh two-factor confirmation created in the login action before allowing session.
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        const user = session.user as typeof session.user & {
          role?: UserRole;
          status?: UserStatus;
          isTwoFactorEnabled?: boolean;
          isOAuth?: boolean;
        };
        if (token.sub) user.id = token.sub;
        if (token.role) user.role = token.role as UserRole;
        if (token.status) user.status = token.status as UserStatus;
        if (typeof token.isTwoFactorEnabled !== 'undefined') {
          user.isTwoFactorEnabled = Boolean(token.isTwoFactorEnabled);
        }
        if (token.name) user.name = token.name;
        if (token.email) user.email = token.email;
        user.isOAuth = Boolean(token.isOAuth);
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      // Enrich JWT with authz fields so middleware and client hooks can gate UI.
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.status = existingUser.status;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
} satisfies NextAuthConfig;
