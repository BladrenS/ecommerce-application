import { z } from 'zod';

import { validCountries } from '../../../constants/countries';

const MIN_AGE = 14;
const today = new Date();
const minBirthDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());

const nameRegex = /^[\p{L}' -]+$/u;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const baseSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().regex(passwordRegex, {
    message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
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
  street: z.string().trim().min(1, { message: 'Street is required' }),
  city: z
    .string({ required_error: 'City is required' })
    .trim()
    .min(1, { message: 'City is required' })
    .regex(nameRegex, { message: 'City must not contain numbers or special characters' }),
});

const postalSchema = z.object({
  postalCode: z
    .string({ required_error: 'Postal code is required' })
    .trim()
    .min(3, { message: 'Postal code is required' })
    .regex(/^\d+$/, { message: 'Postal code must contain only digits' }),
  country: z
    .string()
    .trim()
    .refine((value) => validCountries.includes(value), {
      message: 'Please select a valid country (USA, UK, EU countries, Russia, Belarus)',
    }),
});

export const registrationSchema = baseSchema.merge(postalSchema);

// export const registrationSchema = baseSchema.merge(postalSchema).superRefine((data, context) => {
//   console.log('Country:', data.country);
//   console.log('Postal Code:', data.postalCode);
//   const pattern = postalCodePatterns[data.country];
//   console.log('Pattern:', pattern);

//   if (pattern && !pattern.test(data.postalCode)) {
//     context.addIssue({
//       path: ['postalCode'],
//       code: z.ZodIssueCode.custom,
//       message: `Invalid postal code format for ${data.country}`,
//     });
//     console.log('Invalid postal code format for', data.country);
//   }
// });
// Не смог заставить выводиться сообщение в DOM пока

export type RegistrationFormData = z.infer<typeof registrationSchema>;
