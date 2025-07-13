import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const login = async (mail, contrasena) => {
  const response = await axios.post(`${API_URL}/login`, { mail, contrasena });
  const { token } = response.data;

  // Guardamos el token en localStorage
  localStorage.setItem('token', token);

  return response.data;
};

export const getToken = () => localStorage.getItem('token');

export const logout = () => localStorage.removeItem('token');
