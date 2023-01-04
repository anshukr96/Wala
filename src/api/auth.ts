import $axios from '../lib/axios';
import { SendOTPBody, verifyOTPBody } from '../types/auth/auth';
import { BASE_URL } from '../utils/constants';

/**
 * send OTP to Phone
 * @param body
 * @returns
 */

export const sendOTP = async (body: SendOTPBody) => {
  const request = await $axios
    .post('http://35.154.18.227/api/v1/user/sendOtp', body)
    .then(res => {
      if (res.status == 200) {
        return { data: true, error: null };
      } else {
        return { data: false, error: res.data.error };
      }
    })
    .catch(err => {
      console.log(JSON.stringify(err), 'axioserror');
      if (err.response) {
        return { data: false, error: err.response.data.error };
      }
      return err;
    });

  console.log($axios, 'anshu');

  return request;
};

/**
 * verify OTP
 * @param body
 * @returns
 */

export const verifyOTP = async (body: verifyOTPBody) => {
  const request = await $axios
    .post(`${BASE_URL}/user/verifyOtp`, body)
    .then(res => {
      if (res.status == 200) {
        return { data: res.data.data, error: null };
      } else {
        return { data: null, error: res.data.error };
      }
    })
    .catch(err => {
      if (err.response) {
        return { data: null, error: err.response.data.error };
      }
      return err;
    });

  return request;
};

/**
 * verify OTP
 * @returns
 */

export const SignOut = async () => {
  const request = await $axios
    .delete(`${BASE_URL}/user/signOut`)
    .then(res => {
      if (res.status == 204) {
        return { data: true, error: null };
      } else {
        return { data: false, error: res.data.error };
      }
    })
    .catch(err => {
      if (err.response) {
        return { data: false, error: err.response.data.error };
      }
      return err;
    });

  return request;
};
