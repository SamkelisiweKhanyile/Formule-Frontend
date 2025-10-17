import axios from '@/api/axiosInstance';

const baseUrl = '/product'; 

const productAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default productAPI;