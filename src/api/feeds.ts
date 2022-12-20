import $axios from '../lib/axios';
import { SavePostBody } from '../types/feed/feed';
import { BASE_URL } from '../utils/constants';

/**
 * Get network List
 * @returns
 */

export const GetPostsList = async () => {
  const request = await $axios
    .get(`${BASE_URL}/post`)
    .then(res => {
      if (res.status === 200) {
        console.log(res.data);
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

export const SavePost = async (savePostBody: SavePostBody) => {
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
 * @returns
 */

export const PublishPost = async (id: string) => {
  const request = await $axios
    .patch(`${BASE_URL}/post/makeItLive/${id}`)
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
 * Delete post
 * @param id
 * @param  body
 * @returns
 */

export const DeletePost = async (id: string, body: any) => {
  const request = await $axios
    .delete(`${BASE_URL}/post/${id}`)
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
