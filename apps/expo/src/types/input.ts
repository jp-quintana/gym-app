import { z } from 'zod';

export type Input = {
  name: string;
  placeholder?: string;
  type: string;
  label?: string;
  validation: z.ZodString;
};
