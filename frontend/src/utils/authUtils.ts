import { logout as logoutEndpoint, refreshToken as refreshTokenEndpoint, getUserProfile as getUserProfileEndpoint } from '../api/endpoints';
import { UserData } from '../types';

export const setAuthData = (accessToken: string, refreshToken: string, userData: Record<string, unknown>) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(userData));
};

export const clearAuthData = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};


export const checkAuthStatus = async (): Promise<UserData | null> => {
  try {
    console.log('Checking auth status...');
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.log('No token found in localStorage');
      return null;
    }
    
 
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
    const response = await getUserProfileEndpoint();
    console.log('Auth response:', response.data);
    
    return response.data;
  } catch (error: unknown) {
    console.error('Error checking auth status:', error);
    clearAuthData();
    return null;
  }
};


export const logout = async () => {
  try {
    await logoutEndpoint();
    clearAuthData();
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    clearAuthData();
    return false;
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await refreshTokenEndpoint();
    localStorage.setItem('access_token', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearAuthData();
    return null;
  }
};


