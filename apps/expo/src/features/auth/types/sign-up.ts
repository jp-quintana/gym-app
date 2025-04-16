export interface ISignUp {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

export interface ISignUpResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
}
