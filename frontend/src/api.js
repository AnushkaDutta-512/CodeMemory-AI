import axios from 'axios';

const api = axios.create({
  baseURL: 'https://codememory-aibackend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
