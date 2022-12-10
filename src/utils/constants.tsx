import { Platform } from 'react-native';

export enum NETWORK_LIST {
  ALUMNI = 'alumni',
  RESIDENTIAL = 'residential',
}

export type NETWORK_TYPE = NETWORK_LIST.ALUMNI | NETWORK_LIST.RESIDENTIAL;

export const isIOS = Platform.OS == 'ios';
