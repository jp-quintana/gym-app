import { useForm } from '@/hooks';
import { IInput } from '@/types';
import { z } from 'zod';

export interface IUseOnboarding {
  inputs: IInput[];
  schema: z.ZodSchema;
}

export const useOnboarding = ({ inputs, schema }: IUseOnboarding) => {
  const {
    control,
    secureFormState,
    isFormValid,
    error,
    clearErrors,
    handleSubmit,
    handleSecureInputChange,
    setError,
  } = useForm({ inputs, schema });

  // const { mutate, isPending } = useMutation({
  //   mutationFn: signIn,
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (error: any) => {
  //     if (error?.message) {
  //       setError('server', {
  //         type: 'server',
  //         message: error.message,
  //       });
  //     } else {
  //       setError('server', {
  //         type: 'server',
  //         message: 'Something went wrong.',
  //       });
  //     }
  //   },
  // });

  const handleFormSubmit = handleSubmit(
    async (data: z.infer<typeof schema>) => {
      // mutate(data);
    }
  );

  return {
    // isPending,
    control,
    secureFormState,
    isFormValid,
    error,
    clearErrors,
    handleFormSubmit,
    handleSecureInputChange,
  };
};
