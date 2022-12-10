import { NETWORK_TYPE } from '../../utils/constants';

export interface NetworkListResponse {
  _id: string;
  name: string;
  type: NETWORK_TYPE;
  joiningCode: string;
  createdAt: string;
  updatedAt: string;
}
