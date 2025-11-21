'use server';

import * as z from 'zod';

import { ResetSchema } from '@backend/schemas';
import { getUserByEmail } from '@backend/services/user';
import { sendPasswordResetEmail } from '@backend/email/mail';
import { generatePasswordResetToken } from '@backend/auth/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid emaiL!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: 'Reset email sent!' };
};
