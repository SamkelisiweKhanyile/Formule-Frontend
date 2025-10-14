import axios from '@/api/axiosInstance';

const baseUrl = '/category';

const categoryAPI = {

  getAll: async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error.response?.data || error.message);
      throw error;
    }
  },

  getProductsByCategory: async (categoryId) => {
    try {
      const response = await axios.get(`${baseUrl}/${categoryId}/products`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default categoryAPI;