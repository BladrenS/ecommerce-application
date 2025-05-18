import { z } from 'zod';

import { validCountries } from '../../../constants/countries';

const MIN_AGE = 14;
const today = new Date();
const minBirthDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());

const nameRegex = /^[\p{L}' -]+$/u;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const registrationSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().regex(passwordRegex, {
      message:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
    }),
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
        message:
          'Please select a valid country (Сroatia, Estonia, Finland, France, Germany, Greece, Italy, Lithuania, Spain)',
      }),

    shippingAsBilling: z.boolean(),

    street_billing: z.string().trim().min(1, { message: 'Street is required' }).optional(),
    city_billing: z
      .string({ required_error: 'City is required' })
      .trim()
      .min(1, { message: 'City is required' })
      .regex(nameRegex, { message: 'City must not contain numbers or special characters' })
      .optional(),
    postalCode_billing: z
      .string({ required_error: 'Postal code is required' })
      .trim()
      .regex(/^\d+$/, { message: 'Postal code must contain only digits' })
      .min(5, { message: 'The postal code does not match the codes of the allowed countries' })
      .max(5, { message: 'The postal code does not match the codes of the allowed countries' })
      .optional(),
    country_billing: z
      .string()
      .trim()
      .refine((value) => validCountries.includes(value), {
        message:
          'Please select a valid country (Сroatia, Estonia, Finland, France, Germany, Greece, Italy, Lithuania, Spain)',
      })
      .optional(),
  })
  .superRefine((data, context) => {
    if (!data.shippingAsBilling) {
      if (!data.street_billing?.trim()) {
        context.addIssue({
          path: ['street_billing'],
          code: z.ZodIssueCode.custom,
          message: 'Billing street is required',
        });
      }
      if (!data.city_billing?.trim()) {
        context.addIssue({
          path: ['city_billing'],
          code: z.ZodIssueCode.custom,
          message: 'Billing city is required',
        });
      }
      if (!data.postalCode_billing?.trim()) {
        context.addIssue({
          path: ['postalCode_billing'],
          code: z.ZodIssueCode.custom,
          message: 'Billing postal code is required',
        });
      }
      if (!data.country_billing?.trim()) {
        context.addIssue({
          path: ['country_billing'],
          code: z.ZodIssueCode.custom,
          message: 'Billing country is required',
        });
      }
    }
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
