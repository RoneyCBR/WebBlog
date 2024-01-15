import axios from 'axios';
import { API } from '../post/post';

const PATH = '/api/user';

export const newUserFetch = async (body) => {
  const res = await axios.post(`${API}${PATH}`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data || null;
}