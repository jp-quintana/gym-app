import { Request } from 'express';

export interface IUserRequest extends Request {
  user: {
    userId: string;
    email: string;
    iat: number;
    exp: number;
    refreshToken?: string;
  };
}
