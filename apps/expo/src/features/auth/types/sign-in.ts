export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}
