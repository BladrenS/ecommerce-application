import { z } from 'zod';

import { validCountries } from '../../constants/countries';

const MIN_AGE = 14;
const today = new Date();
const minBirthDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());

const nameRegex = /^[\p{L}' -]+$/u;

export const passwordSchema = z
  .object({
    password: z
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
      .refine(
        (value) => /[!@#$%^&*]/.test(value),
        'Password must contain at least one special character (e.g., !@#$%^&*)',
      ),
    newPassword: z
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
      .refine(
        (value) => /[!@#$%^&*]/.test(value),
        'Password must contain at least one special character (e.g., !@#$%^&*)',
      ),
    newPasswordRepeat: z
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
      .refine(
        (value) => /[!@#$%^&*]/.test(value),
        'Password must contain at least one special character (e.g., !@#$%^&*)',
      ),
  })
  .superRefine((data, context) => {
    if (data.newPassword !== data.newPasswordRepeat) {
      context.addIssue({
        path: ['newPasswordRepeat'],
        code: z.ZodIssueCode.custom,
        message: 'The password confirmation does not match the original password.',
      });
    }
  });

export const personalSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First name is required' })
    .regex(nameRegex, { message: 'First name must not contain numbers or special characters' }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required' })
    .regex(nameRegex, { message: 'Last name must not contain numbers or special characters' }),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.coerce
    .date()
    .refine((date) => date <= minBirthDate, { message: `You must be at least ${MIN_AGE} years old` }),
});

export const addressSchema = z.object({
  street: z.string().trim().min(1, { message: 'Street is required' }),
  city: z
    .string({ required_error: 'City is required' })
    .trim()
    .min(1, { message: 'City is required' })
    .regex(nameRegex, { message: 'City must not contain numbers or special characters' }),
  postalCode: z
    .string({ required_error: 'Postal code is required' })
    .trim()
    .regex(/^\d+$/, { message: 'Postal code must contain only digits' })
    .min(5, { message: 'The postal code does not match the codes of the allowed countries' })
    .max(5, { message: 'The postal code does not match the codes of the allowed countries' }),
  country: z
    .string()
    .trim()
    .refine((value) => validCountries.includes(value), {
      message: 'Only: Сroatia, Estonia, Finland, France, Germany, Greece, Italy, Lithuania, Spain',
    }),
  defaultShipping: z.boolean(),
  defaultBilling: z.boolean(),
});

export type passwordFormData = z.infer<typeof passwordSchema>;
export type personalFormData = z.infer<typeof personalSchema>;
export type addressFormData = z.infer<typeof addressSchema>;
