import axios from 'axios'

class ApiService {
  static apiBaseUrl = 'http://localhost:8080/product'

  static async getAllProducts() {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/getall`)
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw new Error('Unable to fetch products')
    }
  }
}

export default ApiService