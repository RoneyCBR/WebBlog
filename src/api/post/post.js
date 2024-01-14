import axios from 'axios';

export const newPostFetch = async (body) => {
  const res = await axios.post('http://localhost:3000/api/posts', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data || null;
}