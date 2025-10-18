import axios from '@/api/axiosInstance';

const apiUrl = '/admin';
const authUrl = '/auth';

const adminAPI = {

  create: async (adminData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, adminData);
      return response.data;
    } catch (error) {
      console.error("Error creating admin:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${authUrl}/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error("Error logging in as admin:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching admin by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  update: async (adminData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, adminData);
      return response.data;
    } catch (error) {
      console.error("Error updating admin:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting admin:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default adminAPI;