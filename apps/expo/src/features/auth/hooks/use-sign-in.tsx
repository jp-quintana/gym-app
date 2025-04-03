import { useForm } from '@/hooks';
import { IInput } from '@/types';
import { z } from 'zod';
import { signIn } from '../services';

export interface IUseSignIn {
  inputs: IInput[];
  schema: z.ZodSchema;
}

export const useSignIn = ({ inputs, schema }: IUseSignIn) => {
  const {
    control,
    secureFormState,
    isFormValid,
    error,
    handleSubmit,
    handleSecureInputChange,
    setError,
  } = useForm({ inputs, schema });

  const handleFormSubmit = handleSubmit(
    async (data: z.infer<typeof schema>) => {
      try {
        const response = await signIn(data);
        console.log('Submit sign in');
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
    isFormValid,
    error,
    handleFormSubmit,
    handleSecureInputChange,
  };
};
