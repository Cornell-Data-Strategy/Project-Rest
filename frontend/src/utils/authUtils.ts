import axios from 'axios';
import { API_URL } from './config';

// Create an axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for sending/receiving cookies
});

// Check if user is logged in
export const checkAuthStatus = async () => {
    try {
        const response = await api.get('/api/auth/user');
        return response.data;
    } catch (error: unknown) {
        console.error('Error checking auth status:', error);
        return null;
    }
}

// Logout function
export const logout = async () => {
  try {
    await api.post('/api/auth/logout');
    localStorage.removeItem('user');
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

export default api;
