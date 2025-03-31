import { z } from 'zod';

export const SIGN_IN_INPUTS = [
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'example@example.com',
    validation: z.string().min(1).email(),
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    validation: z.string().min(1),
  },
];
