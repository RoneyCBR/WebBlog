import axios from 'axios';

export const API = "http://localhost:8080/api";
const PATH = '/api/posts';

export const newPostFetch = async (body) => {
  console.log('debug API', API);
  const res = await axios.post(`${API}${PATH}`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data || null;
}