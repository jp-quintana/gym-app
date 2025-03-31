import { useForm } from '@/hooks';
import { Input } from '@/types';
import { z } from 'zod';

export interface IUseSignIn {
  inputs: Input[];
  schema: z.ZodObject<any>;
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
        console.log('Submit');
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
