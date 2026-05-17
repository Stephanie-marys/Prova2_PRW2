import axios from 'axios';

// Troque pela URL do seu MockAPI ou outro servidor
// Exemplo MockAPI: https://XXXXXXXX.mockapi.io/filmes
const BASE_URL = process.env.REACT_APP_API_URL || 'https://seu-projeto.mockapi.io/filmes';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const filmesService = {
  getAll: () => api.get('/'),
  getById: (id) => api.get(`/${id}`),
  create: (data) => api.post('/', data),
  update: (id, data) => api.put(`/${id}`, data),
  delete: (id) => api.delete(`/${id}`),
};

export default api;
