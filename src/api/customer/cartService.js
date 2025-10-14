// src/api/business/cartService.js
import axios from '@/api/axiosInstance'  

const baseCartUrl = '/cart'
const baseCartItemsUrl = '/cart-items'

const cartAPI = {

  addToCart: async (customerId, productId, quantity = 1) => {
    try {
      const response = await axios.post(`${baseCartUrl}/add`, null, {
        params: { customerId, productId, quantity }
      })
      return response.data
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message)
      throw error
    }
  },

  getCartByCustomerId: async (customerId) => {
    try {
      const response = await axios.get(`${baseCartUrl}/findByCustomerId/${customerId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message)
      throw error
    }
  },

  deleteItem: async (itemId) => {
    try {
      await axios.delete(`${baseCartItemsUrl}/delete/${itemId}`)
      return true
    } catch (error) {
      console.error("Error deleting cart item:", error.response?.data || error.message)
      throw error
    }
  },

  updateItem: async (cartItem) => {
    try {
      const response = await axios.put(`${baseCartItemsUrl}/update`, cartItem)
      return response.data
    } catch (error) {
      console.error("Error updating cart item:", error.response?.data || error.message)
      throw error
    }
  }

}

export default cartAPI