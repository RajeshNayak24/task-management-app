import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const fetchTasks = () => {
  return axios.get(`${API_URL}/tasks`).then((res) => res.data);
};

export const addTask = (task) => {
  return axios.post(`${API_URL}/tasks`, task).then((res) => res.data);
};

export const updateTask = (task) => {
  return axios.put(`${API_URL}/tasks/${task.id}`, task).then((res) => res.data);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/tasks/${id}`).then((res) => res.data);
};

export const login = (credentials) => axios.post(`${API_URL}/login`, credentials).then((res) => res.data);

export const register = (credentials) => axios.post(`${API_URL}/register`, credentials).then((res) => res.data);