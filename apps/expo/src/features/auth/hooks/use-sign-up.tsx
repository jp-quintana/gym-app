import { useForm } from '@/hooks';
import { IInput } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { signUp } from '../services';
import { useAuthStore } from '@/stores';

export interface IUseSignUp {
  inputs: IInput[];
  schema: z.ZodSchema;
}

export const useSignUp = ({ inputs, schema }: IUseSignUp) => {
  const { setTokens } = useAuthStore((state) => state);

  const {
    control,
    secureFormState,
    error,
    clearErrors,
    handleSubmit,
    handleSecureInputChange,
    setError,
  } = useForm({ inputs, schema });

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log({ data });
      setTokens(data);
    },
    onError: (error: any) => {
      if (error?.message) {
        setError('server', {
          type: 'server',
          message: error.message,
        });
      } else {
        setError('server', {
          type: 'server',
          message: 'Something went wrong.',
        });
      }
    },
  });

  const handleFormSubmit = handleSubmit(
    async (data: z.infer<typeof schema>) => {
      const { tos, ...signUpDto } = data;
      mutate(signUpDto);
    }
  );

  return {
    isPending,
    control,
    secureFormState,
    error,
    clearErrors,
    handleFormSubmit,
    handleSecureInputChange,
  };
};
