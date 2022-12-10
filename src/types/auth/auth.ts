import { NETWORK_TYPE } from '../../utils/constants';

export interface SendOTPBody {
  phoneNumber: string;
}

export interface verifyOTPBody {
  phoneNumber: string;
  otp: string;
}

export interface CreateNetworkBody {
  name: string;
  joiningCode: string;
  type: NETWORK_TYPE;
}

export interface UpdateNetworkBody {
  name: string;
  id: string;
}

export interface AddNetworkBody {
  networkId: string;
}
