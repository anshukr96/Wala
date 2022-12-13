import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const $axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default $axios;
