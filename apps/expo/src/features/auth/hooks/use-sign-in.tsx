import { useForm } from '@/hooks';
import { IInput } from '@/types';
import { z } from 'zod';
import { signIn } from '../services';
import { useMutation } from '@tanstack/react-query';

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

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => {
      if (error?.message) {
        setError('email', {
          type: 'manual',
          message: error.message,
        });
      } else {
        setError('email', { type: 'manual', message: 'Something went wrong.' });
      }
    },
  });

  const handleFormSubmit = handleSubmit(
    async (data: z.infer<typeof schema>) => {
      mutate(data);
    }
  );

  return {
    isPending,
    control,
    secureFormState,
    isFormValid,
    error,
    handleFormSubmit,
    handleSecureInputChange,
  };
};
