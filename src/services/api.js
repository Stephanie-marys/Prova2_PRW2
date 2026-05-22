import axios from 'axios';


const BASE_URL = process.env.REACT_APP_API_URL || 'https://6a09b54ee7e3f433d4835a4e.mockapi.io/:endpoint';

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
