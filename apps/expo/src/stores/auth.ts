import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { asyncStorage } from './async';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (tokens) => set(tokens),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    { name: 'auth-storage', storage: createJSONStorage(() => asyncStorage) }
  )
);
