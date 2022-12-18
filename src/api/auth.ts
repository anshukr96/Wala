import $axios from '../lib/axios';
import { SendOTPBody, verifyOTPBody } from '../types/auth/auth';
import { BASE_URL } from '../utils/constants';

/**
 * send OTP to Phone
 * @param body
 * @returns
 */

export const sendOTP = async (body: SendOTPBody): Promise<boolean> => {
  const request = await $axios
    .post(`${BASE_URL}/user/sendOtp`, body)
    .then(res => {
      if (res.status == 200) {
        return true;
      } else {
        return false;
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
 * @param body
 * @returns
 */

export const verifyOTP = async (body: verifyOTPBody) => {
  const request = await $axios
    .post(`${BASE_URL}/user/verifyOtp`, body)
    .then(res => {
      if (res.status === 200) {
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
