import { Input } from '@/types';
import { useState } from 'react';
import { z } from 'zod';
import { useForm as uf } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface IUseForm {
  inputs: Input[];
  schema: z.ZodObject<any>;
}

export const useForm = ({ inputs, schema }: IUseForm) => {
  const initialFormState: { [key: string]: string } = {};
  const initialSecureFormState: { [key: string]: boolean } = {};

  inputs.forEach((input) => {
    initialFormState[input.name] = '';
    if (input.type === 'password') {
      initialSecureFormState[input.name] = true;
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
    setError,
  } = uf<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialFormState,
  });

  const error = Object.values(errors)[0];

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
