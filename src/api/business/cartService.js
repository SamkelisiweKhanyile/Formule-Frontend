import axios from '@/api/axiosInstance';

const apiUrl = '/cart';

const cartAPI = {
  create: async (cartData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, cartData);
      return response.data;
    } catch (error) {
      console.error("Error creating cart:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  update: async (cartData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, cartData);
      return response.data;
    } catch (error) {
      console.error("Error updating cart:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting cart:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all carts:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  findByCustomerId: async (customerId) => {
    try {
      const response = await axios.get(`${apiUrl}/findByCustomerId/${customerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart by customer ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${apiUrl}/add`, null, { params: { productId, quantity } });
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await axios.delete(`${apiUrl}/remove`, { params: { productId } });
      return response.data;
    } catch (error) {
      console.error("Error removing product from cart:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default cartAPI;