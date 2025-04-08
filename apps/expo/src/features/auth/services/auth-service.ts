import { api } from '@/api';
import { ISignIn, ISignInResponse, ISignUp, ISignUpResponse } from '../types';

export const signIn = async (data: ISignIn): Promise<ISignInResponse> => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error: any) {
    console.error('Error in sign in service', error);
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const signUp = async (data: ISignUp): Promise<ISignUpResponse> => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error: any) {
    console.error('Error in sign in service', error);
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
