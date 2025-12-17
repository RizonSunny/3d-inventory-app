import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});
console.log("API ", api);
export const getModels = () => api.get('/models');
export const createModel = (data) => api.post('/models', data);

export default api;