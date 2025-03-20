import axios from 'axios';
import { API_URL } from './config';
import { UserData } from '../types';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Store tokens and user data
export const setAuthData = (accessToken: string, refreshToken: string, userData: Record<string, unknown>) => {
  localStorage.setItem('token', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(userData));
};

// Clear auth data on logout
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// Check if user is logged in by verifying token with server
export const checkAuthStatus = async (): Promise<UserData | null> => {
  try {
    console.log('Checking auth status...');
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('No token found in localStorage');
      return null;
    }
    
    // Check if token is valid by parsing it (without validation)
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.error('Invalid token format');
        clearAuthData();
        return null;
      }
    } catch (tokenError) {
      console.error('Error parsing token:', tokenError);
      clearAuthData();
      return null;
    }
    
    console.log('Making request to /api/auth/user');
    const response = await api.get('/api/auth/user');
    console.log('Auth response:', response.data);
    
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Auth check error:', error.response?.status, error.response?.data);
      
      // If we get a 422 error (validation error), clear auth data
      if (error.response?.status === 422) {
        console.log('Invalid token format detected, logging out');
        clearAuthData();
      }
    } else {
      console.error('Error checking auth status:', error);
    }
    clearAuthData();
    return null;
  }
};

// Logout function
export const logout = async () => {
  try {
    await api.post('/api/auth/logout');
    clearAuthData();
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    clearAuthData();
    return false;
  }
};

// refresh token function
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axios.post(
      `${API_URL}/api/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      }
    );
    
    localStorage.setItem('token', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearAuthData();
    return null;
  }
};

export default api;
