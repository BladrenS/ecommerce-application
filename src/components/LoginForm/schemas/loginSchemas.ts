import { z } from 'zod';

const emailSchema = z
  .string()
  .nonempty('Field is required')
  .refine((value) => !/\s/.test(value), 'Email address must not contain whitespace')
  .refine((value) => value.includes('@'), {
    message: "Email address must contain an '@' symbol separating local part and domain name",
  })
  .refine(
    (value) => {
      return /^[a-zA-Z0-9-_.@]+$/.test(value) && value.match(/@/g)?.length === 1;
    },
    { message: 'Email address must be properly formatted (e.g., user@example.com)' },
  )
  .refine(
    (value) => {
      const [local] = value.split('@');
      return local.length > 0;
    },
    { message: 'Email address must contain a local part' },
  )
  .refine((value) => /@[a-zA-Z0-9-_]+(\.[a-zA-Z]{2,})+$/.test(value), {
    message: 'Email address must contain a domain name (e.g., example.com)',
  });

const passwordSchema = z
  .string()
  .nonempty('Field is required')
  .min(8, 'Password must be at least 8 characters long')
  .refine((value) => !/\s/.test(value), 'Password must not contain whitespace')
  .refine(
    (value) => /^[a-zA-Z0-9!@#$%^&*]+$/.test(value),
    'Password must contain only Latin characters, numbers and special characters (e.g., !@#$%^&*)',
  )
  .refine((value) => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter (A-Z)')
  .refine((value) => /[a-z]/.test(value), 'Password must contain at least one lowercase letter (a-z)')
  .refine((value) => /[0-9]/.test(value), 'Password must contain at least one digit (0-9)')
  .refine((value) => /[!@#$%^&*]/.test(value), 'Password must contain at least one special character (e.g., !@#$%^&*)');

export const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginField = z.infer<typeof schema>;
