import { useAuthStore } from '@/stores';
import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL;
const headers = {
  'Api-Key': process.env.EXPO_PUBLIC_API_KEY,
};

const api = axios.create({
  baseURL,
  headers,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (requestError) => {
    console.log({ requestError });
    return Promise.reject(requestError);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (responseError) => {
    const originalRequest = responseError.config;
    const { message, statusCode } = responseError.response.data;
    if (statusCode === 401 && message === 'jwt expired') {
      try {
        if (originalRequest._retry) {
          throw new Error('Refresh token failed');
        }

        originalRequest._retry = true;

        const refreshToken = useAuthStore.getState().refreshToken;

        const response = await axios.get(baseURL + '/auth/mobile-refresh', {
          headers: {
            'Refresh-Token': refreshToken,
            ...headers,
          },
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        useAuthStore.setState({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        // if refresh logic breaks try
        // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest);
      } catch (refreshError) {
        console.log({ refreshError });
        useAuthStore.getState().clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(responseError);
  }
);

export { api };
