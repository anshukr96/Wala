import $axios from '../lib/axios';
import {
  AddNetworkBody,
  CreateNetworkBody,
  UpdateNetworkBody,
} from '../types/auth/auth';
import { BASE_URL } from '../utils/constants';

/**
 * Get network List
 * @param body
 * @returns
 */

export const GetNetworkList = async () => {
  const request = await $axios
    .get(`${BASE_URL}/network`)
    .then(res => {
      return { data: res.data.data };
    })
    .catch(err => {
      if (err.response) {
        return err.response.data;
      }
      return err;
    });

  return request;
};

/**
 * Add to network
 * @param requestBody
 * @returns
 */

export const CreateNetwork = async (requestBody: CreateNetworkBody) => {
  const request = await $axios
    .post(`${BASE_URL}/network`, requestBody)
    .then(res => res)
    .catch(err => {
      if (err.response) {
        return err.response.data;
      }
      return err;
    });

  return request;
};

/**
 * Update network
 * @param requestBody
 * @returns
 */

export const UpdateNetwork = async (requestBody: UpdateNetworkBody) => {
  const request = await $axios
    .patch(`${BASE_URL}/network`, requestBody)
    .then(res => res)
    .catch(err => {
      if (err.response) {
        return err.response.data;
      }
      return err;
    });

  return request;
};

/**
 * Update network
 * @param networkID
 * @returns
 */

export const GetNetworkDetail = async (networkID: string) => {
  const request = await $axios
    .get(`${BASE_URL}/network/${networkID}`)
    .then(res => res)
    .catch(err => {
      if (err.response) {
        return err.response.data;
      }
      return err;
    });

  return request;
};

/**
 * Delete network
 * @param networkID
 * @returns
 */

export const DeleteNetwork = async (networkID: string) => {
  const request = await $axios
    .get(`${BASE_URL}/network/${networkID}`)
    .then(res => {
      if (res.status == 201) {
        return {
          message: 'You have successfully deleted the network',
          error: null,
        };
      } else {
        return {
          message: null,
          error: 'Unable to delete the network',
        };
      }
    })
    .catch(_ => {
      return {
        message: null,
        error: 'Unable to delete the network',
      };
    });

  return request;
};

/**
 * Add network
 * @param requestBody
 * @returns
 */

export const AddToNetwork = async (requestBody: AddNetworkBody) => {
  const request = await $axios
    .post(`${BASE_URL}/user/addNetwork`, requestBody)
    .then(res => {
      if (res.status == 201) {
        return {
          message: 'You have successfully added to the network',
          error: null,
        };
      } else {
        return {
          message: 'Incorrect Pin',
          error: true,
        };
      }
    })
    .catch(_ => {
      return { message: 'Incorrect Pin', error: true };
    });

  return request;
};
