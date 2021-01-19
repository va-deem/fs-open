import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAllEntries = () => {
  return axios.get(baseUrl);
};

const createEntry = newEntry => {
  return axios.post(baseUrl, newEntry);
};

const updateEntry = (id, newEntry) => {
  return axios.put(`${baseUrl}/${id}`, newEntry);
};

const deleteEntry = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const service = { getAllEntries, createEntry, updateEntry, deleteEntry }

export default service;
