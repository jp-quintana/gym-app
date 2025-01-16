import { Request } from 'express';

export interface UserRequest extends Request {
  user: {
    userId: string;
    email: string;
    iat: number;
    exp: number;
  };
}
