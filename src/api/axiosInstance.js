import axios from 'axios';
import { useUserStore } from '@/store/userStore.js';
import router from '@/router'; // make sure your router is exported

const axiosInstance = axios.create({
  // Change baseURL to your backend
  // baseURL: 'https://localhost:8080/formule', 
  baseURL: 'https://organic-couscous-pqgx46pg957f65v5-8080.app.github.dev/formule',
  timeout: 10000, // 10 seconds
});

// Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 Unauthorized globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized! Logging out...');
      const userStore = useUserStore();
      userStore.logout();
      router.push('/login'); // redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;