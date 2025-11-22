'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@backend/db/db';
import { RegisterSchema } from '@backend/schemas';
import { getUserByEmail } from '@backend/services/user';
import { sendVerificationEmail } from '@backend/email/mail';
import { generateVerificationToken } from '@backend/auth/tokens';
import { env } from '@backend/env';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const skipVerification = env.SKIP_EMAIL_VERIFICATION && process.env.NODE_ENV === 'development';

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      emailVerified: skipVerification ? new Date() : null,
    },
  });

  if (skipVerification) {
    return { success: 'Verification skipped (dev mode).' };
  }

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};
