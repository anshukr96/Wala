import $axios from '../lib/axios';
import { BASE_URL } from '../utils/constants';

/**
 * Get network List
 * @returns
 */

export const GetPostsList = async () => {
  const request = await $axios
    .get(`${BASE_URL}/post?published=true`)
    .then(res => {
      if (res.status === 200) {
        return { data: res.data.data, err: null };
      }
      return { data: null, err: res.data.error };
    })
    .catch(err => {
      return { data: null, err: err };
    });

  return request;
};

/**
 * save post
 * @param postBody
 * @returns
 */

export const SavePost = async (savePostBody: any) => {
  const request = await $axios
    .patch(`${BASE_URL}/post`, savePostBody)
    .then(res => {
      if (res.status === 200) {
        return { data: true, err: null };
      }
      return { data: false, err: res };
    })
    .catch(err => {
      return { data: false, err: err };
    });

  return request;
};

/**
 * Publish Post
 * @param id
 * @param body
 * @returns
 */

export const CreatePost = async (body: any) => {
  const request = await $axios
    .post(`${BASE_URL}/post`, body)
    .then(res => {
      if (res.status === 200) {
        return { data: true, err: null };
      }
      return { data: false, err: res.data.error };
    })
    .catch(err => {
      return { data: false, err: err.response?.data.error };
    });

  return request;
};

/**
 * Publish Post
 * @param id
 * @param body
 * @returns
 */

export const UpdatePost = async (body: any) => {
  const request = await $axios
    .patch(`${BASE_URL}/post`, body)
    .then(res => {
      if (res.status === 200) {
        return { data: true, err: null };
      }
      return { data: false, err: res.data.error };
    })
    .catch(err => {
      return { data: false, err: err.response?.data.error };
    });

  return request;
};

/**
 * Delete post
 * @param postID
 * @param  body
 * @returns
 */

export const DeletePost = async (postID: string, body: any) => {
  const request = await $axios
    .delete(`${BASE_URL}/post/${postID}`, body)
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        return { data: true, err: null };
      }
      return { data: false, err: res };
    })
    .catch(err => {
      return { data: false, err: err };
    });

  return request;
};

/**
 * Get existing post list
 * @param userID
 * @returns
 */

export const GetExistingPosts = async (userID: string) => {
  const request = await $axios
    .get(`${BASE_URL}/post?user=${userID}`)
    .then(res => {
      if (res.status === 200) {
        return { data: res.data.data, err: 'Unable to fetch list' };
      }
      return { data: null, err: 'Unable to fetch list' };
    })
    .catch(_ => {
      return { data: null, err: 'Unable to fetch list' };
    });

  return request;
};
