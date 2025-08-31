import axios from 'axios';

const apiUrl = 'http://localhost:8080/formule/admin';

const adminAPI = {

  create: async (adminData) => {
    try {
    
      const response = await axios.post(`${apiUrl}/create`, adminAPI);
      return response.data; 
    } catch (error) {
      console.error("Error creating admn:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAll`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching admin:", error.response ? error.response.data : error.message);
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


  update: async (id, adminData) => {
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
  }

  
};

export default adminAPI;
