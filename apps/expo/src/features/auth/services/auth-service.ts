import { api } from '@/api';
import { ISignIn, ISignInResponse } from '../types';

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

export const signUp = async (data: ISignIn): Promise<ISignInResponse> => {
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
