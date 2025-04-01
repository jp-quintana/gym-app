import { getSchemaObject } from '@/utils/helpers';
import { SIGN_UP_INPUTS } from '../constants/sign-up-inputs';

export const signUpSchema = getSchemaObject(SIGN_UP_INPUTS).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
);
