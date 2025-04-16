import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: Date | null;
  refreshTokenExpiresAt: Date | null;
  setTokens: (tokens: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
  }) => void;
  clearTokens: () => void;
}

const initialState = {
  accessToken: null,
  refreshToken: null,
  accessTokenExpiresAt: null,
  refreshTokenExpiresAt: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  setTokens: (payload) => set(payload),
  clearTokens: () => set(initialState),
}));
