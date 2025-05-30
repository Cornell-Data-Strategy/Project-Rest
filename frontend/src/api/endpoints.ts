import api from './axios';

// AUTH ENDPOINTS
export const login = (email: string, password: string) => 
  api.post('/api/auth/login', { email, password });

export const logout = () => 
  api.post('/api/auth/logout');

export const refreshToken = () => 
  api.post('/api/auth/refresh');

export const getUserProfile = () => 
  api.get('/api/auth/user');

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

// Business summary endpoint
export const getBusinessSummary = (business_id: number) => 
  api.get(`/api/dashboard/business/${business_id}/summary`);

export const getRecentReviews = (business_id: number) => 
  api.get(`/api/dashboard/business/${business_id}/reviews/recent`);

export const getAIInsights = (business_id: number) => 
  api.get(`/api/dashboard/business/${business_id}/insights`);

export const generateAIInsight = (business_id: number) =>
  api.post(`/api/dashboard/business/${business_id}/insights/generate`);

export const getRatingsDistribution = (business_id: number) =>
  api.get(`/api/reviews/${business_id}/ratings-distribution`);

export const getTopicsFrequency = (business_id: number) =>
  api.get(`/api/reviews/${business_id}/topics-frequency`);