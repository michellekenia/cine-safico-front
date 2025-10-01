import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY_SECRET;

const apiClient = axios.create({
  baseURL: 'https://cine-safico.onrender.com',
  timeout: 45000,
  headers: {
    // 'x-api-key': apiKey,
    'Content-Type': 'application/json',
  },
});


export default apiClient;