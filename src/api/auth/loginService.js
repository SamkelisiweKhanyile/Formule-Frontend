import axiosInstance from './axiosInstance'; 

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;

  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};