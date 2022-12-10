import $axios from '../lib/axios';
import { BASE_URL } from '../utils/constants';

/**
 * Get network List
 * @returns
 */

export const GetFeedList = async () => {
  const request = await $axios
    .get(`${BASE_URL}/network`)
    .then(res => res)
    .catch(err => {
      if (err.response) return err.response.data;
      return err;
    });

  return request;
};
