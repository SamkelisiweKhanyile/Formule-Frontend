
import axios from 'axios';

const apiUrl = 'http://localhost:8080/formule/cart';

const cartAPI = {
  
  addToCart: async (customerId, productId, quantity = 1) => {
    try {
      const response = await axios.post(`${apiUrl}/add`, null, {
        params: {
          customerId,
          productId,
          quantity
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      throw error;
    }
  },

  
  getCartByCustomerId: async (customerId) => {
    try {
      const response = await axios.get(`${apiUrl}/findByCustomerId/${customerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
      throw error;
    }
  },

  
  deleteItem: async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/formule/cart-items/delete/${itemId}`);
      return true;
    } catch (error) {
      console.error("Error deleting cart item:", error);
      throw error;
    }
  },

  
  updateItem: async (cartItem) => {
    try {
      const response = await axios.put(`http://localhost:8080/formule/cart-items/update`, cartItem);
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  }
};

export default cartAPI;