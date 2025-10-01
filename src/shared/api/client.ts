import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY_SECRET;

const apiClient = axios.create({
  baseURL: 'https://cine-safico.onrender.com',
  timeout: 45000,
  headers: {
    'x-api-key': apiKey,
    'Content-Type': 'application/json',
  },
});

// Interceptador para requisições - adiciona timestamp para debug
apiClient.interceptors.request.use(
  config => {
    console.log(`Requisição iniciada: ${config.method?.toUpperCase()} ${config.url} (${new Date().toISOString()})`);
    return config;
  },
  error => {
    console.error('Erro na configuração da requisição:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    console.log(`Requisição concluída: ${response.config.method?.toUpperCase()} ${response.config.url} (${response.status})`);
    return response;
  },
  error => {

    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('TIMEOUT: A requisição demorou muito para responder', {
        url: error.config?.url,
        method: error.config?.method
      });
      error.message = 'O servidor está demorando para responder. Por favor, tente novamente.';
    } 

    else if (error.message === 'Network Error') {
      console.error('ERRO DE REDE: Sem conexão com o servidor', {
        url: error.config?.url,
        method: error.config?.method
      });
      error.message = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
    } 

    else {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    return Promise.reject(error);
  }
);

export default apiClient;