import axios from '@/api/axiosInstance';

const apiUrl = '/cart-items';

const cartItemAPI = {
  create: async (cartItemData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, cartItemData);
      return response.data;
    } catch (error) {
      console.error("Error creating cart item:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart item by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  update: async (cartItemData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, cartItemData);
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting cart item:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  findByCartId: async (cartId) => {
    try {
      const response = await axios.get(`${apiUrl}/findByCartId/${cartId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items by cart ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all cart items:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default cartItemAPI;