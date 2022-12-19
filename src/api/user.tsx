import $axios from '../lib/axios';
import { SaveFeedbackBody, UpdateUserBody } from '../types/users/user';
import { BASE_URL } from '../utils/constants';

/**
 * update User details
 * @param body
 * @returns
 */

export const UpdateUserDetails = async (body: UpdateUserBody) => {
  const request = await $axios
    .patch(`${BASE_URL}/user`, body)
    .then(res => {
      return { data: res, error: null };
    })
    .catch(err => {
      return { error: err.response.data, data: null };
    });

  return request;
};

/**
 * send OTP to Phone
 * @param body
 * @returns
 */

export const SaveFeedback = async (body: SaveFeedbackBody) => {
  const request = await $axios
    .post(`${BASE_URL}/feedback`, body)
    .then(res => {
      if (res.status == 200) {
        return { data: true, error: null };
      } else {
        return { data: false, error: res.data.error };
      }
    })
    .catch(_ => {
      return { data: false, error: _.error };
    });

  return request;
};

/**
 * upload media
 * @param imageFile
 * @returns
 */

export const UploadMedia = async (imageFile: string) => {
  var bodyFormData = new FormData();
  bodyFormData.append('file', imageFile);

  const request = await $axios
    .post(`${BASE_URL}/media`, {
      bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => {
      if (res.status == 200) {
        return { data: res.data, error: null };
      } else {
        return { data: null, error: null };
      }
    })
    .catch(_ => {
      return { data: null, error: _ };
    });

  return request;
};
