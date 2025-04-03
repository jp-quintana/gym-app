import { IInput } from '@/types';
import { z } from 'zod';

export function getSchemaObject(inputs: IInput[]) {
  return z.object(
    inputs.reduce((acc, { name, validation }) => {
      acc[name as keyof typeof acc] = validation;
      return acc;
    }, {} as Record<(typeof inputs)[number]['name'], (typeof inputs)[number]['validation']>)
  );
}
