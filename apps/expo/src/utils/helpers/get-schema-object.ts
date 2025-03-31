import { z } from 'zod';

type SchemaField = {
  name: string;
  validation: z.ZodTypeAny;
};

export function getSchemaObject<T extends readonly SchemaField[]>(inputs: T) {
  return z.object(
    inputs.reduce((acc, { name, validation }) => {
      acc[name as keyof typeof acc] = validation;
      return acc;
    }, {} as Record<T[number]['name'], T[number]['validation']>)
  );
}
