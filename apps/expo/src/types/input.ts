import { z } from 'zod';

export interface IInput {
  name: string;
  placeholder?: string;
  type: string;
  label?: string;
  validation: z.ZodSchema;
}
