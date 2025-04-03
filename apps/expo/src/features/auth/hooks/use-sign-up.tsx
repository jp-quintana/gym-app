import { useForm } from '@/hooks';
import { IInput } from '@/types';
import { z } from 'zod';

export interface IUseSignUp {
  inputs: IInput[];
  schema: z.ZodSchema;
}

export const UseSignUp = ({ inputs, schema }: IUseSignUp) => {
  const {
    control,
    secureFormState,
    error,
    handleSubmit,
    handleSecureInputChange,
    setError,
  } = useForm({ inputs, schema });

  const handleFormSubmit = handleSubmit(
    async (data: z.infer<typeof schema>) => {
      try {
        console.log('Submit sign up');
      } catch (error: any) {
        // setError('email', {
        //   type: 'manual',
        //   message,
        // });
      }
    }
  );

  return {
    control,
    secureFormState,
    error,
    handleFormSubmit,
    handleSecureInputChange,
  };
};
