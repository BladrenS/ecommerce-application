import { z } from 'zod';

import { validCountries } from '../../../constants/countries';

const MIN_AGE = 14;
const today = new Date();
const minBirthDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());

const nameRegex = /^[\p{L}' -]+$/u;

export const registrationSchema = z
  .object({
    email: z.string().email('Invalid email address'),
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
    dateOfBirth: z.coerce
      .date()
      .refine((date) => date <= minBirthDate, { message: `You must be at least ${MIN_AGE} years old` }),

    street_shipping: z.string().trim().min(1, { message: 'Street is required' }),
    city_shipping: z
      .string({ required_error: 'City is required' })
      .trim()
      .min(1, { message: 'City is required' })
      .regex(nameRegex, { message: 'City must not contain numbers or special characters' }),
    postalCode_shipping: z
      .string({ required_error: 'Postal code is required' })
      .trim()
      .regex(/^\d+$/, { message: 'Postal code must contain only digits' })
      .min(5, { message: 'The postal code does not match the codes of the allowed countries' })
      .max(5, { message: 'The postal code does not match the codes of the allowed countries' }),
    country_shipping: z
      .string()
      .trim()
      .refine((value) => validCountries.includes(value), {
        message: 'Only: Сroatia, Estonia, Finland, France, Germany, Greece, Italy, Lithuania, Spain',
      }),

    shippingAsBilling: z.boolean(),
    defaultShipping: z.boolean(),
    defaultBilling: z.boolean().optional(),

    street_billing: z.string().trim().min(1, { message: 'Street is required' }).optional(),
    city_billing: z
      .string()
      .trim()
      .min(1, { message: 'City is required' })
      .regex(nameRegex, { message: 'City must not contain numbers or special characters' })
      .optional(),
    postalCode_billing: z
      .string()
      .trim()
      .regex(/^\d+$/, { message: 'Postal code must contain only digits' })
      .min(5, { message: 'The postal code does not match the codes of the allowed countries' })
      .max(5, { message: 'The postal code does not match the codes of the allowed countries' })
      .optional(),
    country_billing: z
      .string()
      .trim()
      .refine((value) => validCountries.includes(value), {
        message: 'Only: Сroatia, Estonia, Finland, France, Germany, Greece, Italy, Lithuania, Spain',
      })
      .optional(),
  })
  .superRefine((data, context) => {
    if (!data.shippingAsBilling) {
      if (!data.street_billing) {
        context.addIssue({
          path: ['street_billing'],
          code: z.ZodIssueCode.custom,
          message: 'Street is required',
        });
      }
      if (!data.city_billing) {
        context.addIssue({
          path: ['city_billing'],
          code: z.ZodIssueCode.custom,
          message: 'City is required',
        });
      }
      if (!data.postalCode_billing) {
        context.addIssue({
          path: ['postalCode_billing'],
          code: z.ZodIssueCode.custom,
          message: 'Postal code is required',
        });
      }
      if (!data.country_billing) {
        context.addIssue({
          path: ['country_billing'],
          code: z.ZodIssueCode.custom,
          message: 'Only: Сroatia, Estonia, Finland, France, Germany, Greece, Italy, Lithuania, Spain',
        });
      }
    }
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
