import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm as uf } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IInput } from '@/types';

export interface IUseForm {
  inputs: IInput[];
  schema: z.ZodSchema;
}

export const useForm = ({ inputs, schema }: IUseForm) => {
  const initialFormState: { [key: string]: string | boolean } = {};
  const initialSecureFormState: { [key: string]: boolean } = {};

  inputs.forEach((input) => {
    if (input.type === 'checkbox') {
      initialFormState[input.name] = false;
    } else {
      initialFormState[input.name] = '';
      if (input.type === 'password') {
        initialSecureFormState[input.name] = true;
      }
    }
  });

  const [secureFormState, setSecureFormState] = useState(
    initialSecureFormState
  );

  const handleSecureInputChange = (key: string) => {
    setSecureFormState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    formState,
    setError,
    clearErrors,
  } = uf<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialFormState,
  });

  const error = Object.values(errors)[0];

  useEffect(() => {
    if (Object.keys(errors).length > 1) {
      if (Object.keys(errors).includes('server')) clearErrors('server');
    }
  }, [formState]);

  return {
    control,
    secureFormState,
    isFormValid: isValid,
    error,
    handleSubmit,
    handleSecureInputChange,
    setError,
  };
};
