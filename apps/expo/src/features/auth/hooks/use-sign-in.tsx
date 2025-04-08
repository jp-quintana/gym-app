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
      // console.log('Sign in successful:', data);
    },
    onError: (error: any) => {
      console.log(error);
      // console.error('Sign in failed:', error);
      // if (error?.response?.data?.message) {
      //   setError('email', {
      //     type: 'manual',
      //     message: error.response.data.message,
      //   });
      // } else {
      //   setError('email', { type: 'manual', message: 'Sign in failed.' });
      // }
    },
  });

  const handleFormSubmit = handleSubmit(
    async (data: z.infer<typeof schema>) => {
      mutate(data);
    }
  );

  return {
    control,
    secureFormState,
    isFormValid,
    isPending,
    error,
    handleFormSubmit,
    handleSecureInputChange,
  };
};
