import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

// Intercepteur pour les erreurs globales
api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'Une erreur est survenue';
    return Promise.reject(new Error(message));
  }
);

// ─── Projets ─────────────────────────────────────────────
export const getProjects = (params = {}) =>
  api.get('/projects', { params }).then(r => r.data);

export const getProject = (id) =>
  api.get(`/projects/${id}`).then(r => r.data);

export const createProject = (data) =>
  api.post('/projects', data).then(r => r.data);

export const updateProject = (id, data) =>
  api.put(`/projects/${id}`, data).then(r => r.data);

export const deleteProject = (id) =>
  api.delete(`/projects/${id}`).then(r => r.data);

export const getProjectStats = () =>
  api.get('/projects/stats/summary').then(r => r.data);

// ─── Contact ─────────────────────────────────────────────
export const sendContact = (data) =>
  api.post('/contact', data).then(r => r.data);

export default api;
