import axios from 'axios';

const apiUrl = 'http://localhost:8080/customer';

const customerAPI = {

  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAll`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching customers:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching customer by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
  
};

export default customerAPI;
