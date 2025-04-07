import api from './axios';

// AUTH ENDPOINTS
export const login = (email: string, password: string) => 
  api.post('/api/auth/login', { email, password });

export const logout = () => 
  api.post('/api/auth/logout');

export const refreshToken = () => 
  api.post('/api/auth/refresh');

export const getUserProfile = () => 
  api.get('/api/user/profile');

export const register = (registerData: { 
  email: string; 
  password: string; 
  first_name: string; 
  last_name: string;
  business: {
    name: string;
    url: string;
    location?: string;
    business_type?: string;
  }
}) => api.post('/api/auth/register', registerData);

export const getRating = (business_id: number) => 
  api.get(`/api/business/${business_id}/rating`);

// define endpoints and call

export const getRecentReviews = (business_id: number) => 
  api.get(`/api/dashboard/business/${business_id}/reviews/recent`);
