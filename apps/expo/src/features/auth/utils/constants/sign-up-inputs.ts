import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.+)$/;

export const SIGN_UP_INPUTS = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'username',
    validation: z.string().min(1, { message: 'Username is empty.' }),
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'example@example.com',
    validation: z
      .string()
      .min(1, { message: 'Email is empty.' })
      .email({ message: 'Email is invalid.' }),
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    validation: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' })
      .regex(passwordRegex, {
        message:
          'Password must contain at least 1 uppercase letter and 1 symbol.',
      }),
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm password',
    validation: z.string().min(1, { message: 'Confirm password is empty.' }),
  },
  {
    name: 'tos',
    type: 'checkbox',
    validation: z.boolean().refine((val) => val, {
      message: 'You must agree to the terms & conditions.',
    }),
  },
];
