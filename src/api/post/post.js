import axios from 'axios';

export const API = "http://localhost:8080";
const PATH = '/api/posts';

export const newPostFetch = async (body) => {
  const res = await axios.post(`${API}${PATH}`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data || null;
}

export const getPosts = async () => {
  const res = await axios.get(`${API}${PATH}`);
  return res?.data || [];
}