import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY_SECRET;

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: 'https://cine-safico.onrender.com',
  headers: {
    'x-api-key': apiKey,
    'Content-Type': 'application/json',

  },
});

export default apiClient;