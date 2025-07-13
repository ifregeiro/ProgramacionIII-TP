import axios from './axiosConfig.js'; // <-- ya envía el token automático


const API_URL = 'http://localhost:3001/api/books';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getBooks = async () => {
  const res = await axios.get(API_URL, getAuthHeader());
  return res.data;
};

export const createBook = async (book) => {
  const res = await axios.post(API_URL, book, getAuthHeader());
  return res.data;
};

export const updateBook = async (id, book) => {
  const res = await axios.put(`${API_URL}/${id}`, book, getAuthHeader());
  return res.data;
};

export const deleteBook = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return res.data;
};
