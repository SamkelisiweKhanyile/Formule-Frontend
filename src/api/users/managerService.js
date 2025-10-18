import axios from '@/api/axiosInstance';

const apiUrl = '/manager';
const authUrl = '/auth';

const managerAPI = {

  create: async (managerData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, managerData);
      return response.data;
    } catch (error) {
      console.error("Error creating manager:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${authUrl}/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error("Error logging in as manager:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching manager by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  update: async (managerData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, managerData);
      return response.data;
    } catch (error) {
      console.error("Error updating manager:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting manager:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default managerAPI;