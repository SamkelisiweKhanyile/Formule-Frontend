import axios from 'axios'

// 1️⃣ Create the Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/formule', // change if your backend base path differs
  timeout: 10000, // optional: 10 seconds timeout
})

// 2️⃣ Automatically attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // assumes you save JWT here
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 3️⃣ Optional: handle responses globally (like logging out if 401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // maybe redirect to login
      console.warn('Unauthorized! Redirecting to login...')
      // window.location.href = '/auth'  // uncomment if you want auto redirect
    }
    return Promise.reject(error)
  }
)

export default axiosInstance