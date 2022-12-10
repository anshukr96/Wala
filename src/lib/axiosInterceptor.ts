import $axios from './axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosRequestConfig } from 'axios';
import { TOKEN } from '../utils/constants';

/**
 * add authorization token on each request
 * @returns
 */
export const requestInterceptor = () => {
  $axios.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      const accessTokenCookie = await AsyncStorage.getItem(TOKEN!);
      if (accessTokenCookie) {
        config.headers!['Authorization'] = `Bearer ${accessTokenCookie}`;
      }
      return config;
    },
    error => {
      console.log(error, 'sdfds');
      Promise.reject(error);
    },
  );
};
