import axios from 'axios';
import { API } from '../post/post';

const PATH = '/api/authentication';

export const newAuthFetch = async (params) => {
  const res = await axios.get(`${API}${PATH}`, {
    params: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return res.data || null;
}