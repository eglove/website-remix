import { z } from 'zod';

export const zodDownloadsSchema = z.object({
  downloads: z.number(),
});

const nameSchema = z.string().min(3).max(100);

export const exampleSignUpSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email('Invalid email address'),
    firstName: nameSchema,
    lastName: nameSchema,
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(30, 'Password cannot be longer than 30 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*@^])/u,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)',
      ),
  })
  .refine(
    data => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    },
  );
