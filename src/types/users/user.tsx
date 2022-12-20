import { NETWORK_TYPE } from '../../utils/constants';

export interface SaveFeedbackBody {
  text: string;
  type: string;
}

export interface UpdateUserBody {
  username: string;
  email: string;
  profileImage: string;
}

export interface NetworkInfo {
  _id: string;
  name: string;
  type: NETWORK_TYPE;
  joiningCode: string;
}

export interface UserInfoBody {
  phoneNumber: string;
  username: string;
  profileImage: string;
  _id?: string;
  networks: NetworkInfo[];
}
