import { z } from 'zod';

export const ONBOARDING_INPUTS = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'username',
    validation: z.string().min(1, { message: 'Username is empty.' }),
  },
];
