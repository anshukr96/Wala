import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import $axios from '../lib/axios';
import { SaveFeedbackBody, UserInfoBody } from '../types/users/user';
import { BASE_URL, TOKEN } from '../utils/constants';

/**
 * Get User details
 * @param id
 * @returns
 */

export const GetUserDetails = async (id: string) => {
  const request = await $axios
    .get(`${BASE_URL}/user/${id}`)
    .then(res => {
      return { data: res.data.data, error: null };
    })
    .catch(err => {
      console.log(err);
      return { error: err.response.data, data: null };
    });

  return request;
};

/**
 * update User details
 * @param body
 * @returns
 */

export const UpdateUserDetails = async (body: UserInfoBody) => {
  const request = await $axios
    .patch(`${BASE_URL}/user`, body)
    .then(res => {
      if (res.status == 200) {
        return { data: 'Details are updated successfully', error: null };
      } else {
        return { data: null, error: res.data.data };
      }
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

export const UploadMedia = async (imageFile: any) => {
  const token = await AsyncStorage.getItem(TOKEN);

  let bodyFormData = new FormData();
  bodyFormData.append('file', {
    uri: imageFile.uri,
    type: imageFile.type,
    name: imageFile.fileName,
  });

  const request = await axios
    .post(`${BASE_URL}/media`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    })
    .then(res => {
      if (res.status == 200) {
        return { data: res.data.data, error: null };
      } else {
        return { data: null, error: null };
      }
    })
    .catch(_ => {
      return { data: null, error: _.response.data.error };
    });

  return request;
};
