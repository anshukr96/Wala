import { Platform } from 'react-native';
import Config from 'react-native-config';

export enum NETWORK_LIST {
  ALUMNI = 'ALUMINI',
  RESIDENTIAL = 'RESIDENTIAL_SOCIETY',
}

export type NETWORK_TYPE = NETWORK_LIST.ALUMNI | NETWORK_LIST.RESIDENTIAL;

export const isIOS = Platform.OS == 'ios';

export const BASE_URL = Config.API_URL;
export const USERID = 'userID';
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
export const OPTIONS = [
  {
    id: 1,
    name: 'Request creation of  a new network',
    selected: false,
  },
  {
    id: 2,
    name: 'Request access to existing network',
    selected: false,
  },
  {
    id: 3,
    name: 'Feedback/Suggestions',
    selected: false,
  },
  {
    id: 4,
    name: 'Other',
    selected: false,
  },
];

export const MENU_OPTIONS = [
  {
    id: 1,
    name: 'Sold',
    selected: false,
  },
  {
    id: 2,
    name: 'Don’t want to sell',
    selected: false,
  },
  {
    id: 3,
    name: 'Others',
    selected: false,
  },
];

export const NETWORK_LISTING = [
  { id: 1, name: 'Godrej Woodsman Estate', selected: false },
  { id: 2, name: 'DLF Corporate Park', selected: false },
  { id: 3, name: 'ISB Alumni', selected: false },
];

export interface OptionProps {
  id: number;
  name: JSX.Element | string;
  selected: boolean;
}
