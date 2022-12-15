import { Platform } from 'react-native';
import Config from 'react-native-config';

export enum NETWORK_LIST {
  ALUMNI = 'ALUMINI',
  RESIDENTIAL = 'RESIDENTIAL_SOCIETY',
}

export type NETWORK_TYPE = NETWORK_LIST.ALUMNI | NETWORK_LIST.RESIDENTIAL;

export const isIOS = Platform.OS == 'ios';

export const BASE_URL = Config.API_URL;
export const TOKEN = 'token';
export const TOAST = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
};
export const TOAST_POSITION = {
  BOTTOM: 'bottom',
  TOP: 'top',
};
