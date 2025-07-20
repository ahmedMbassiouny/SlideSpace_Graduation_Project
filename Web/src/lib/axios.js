
import axios from 'axios';
import { FrontDemoMode } from '../config';

const api = axios.create({
  baseURL: 'http://localhost/projects/My-Projects/GP%20-%20website/3-%20website/VF/backend/api/', 
  withCredentials: true ,
});

// Helper to mock API responses in FrontDemoMode
const mockApiResponse = async (options) => {
  // You can expand this logic for each endpoint as needed
  if (options.url.includes('csrf.php')) {
    return { data: { csrf_token: 'demo-csrf-token' } };
  }
  if (options.url.includes('auth.php') && options.method === 'post') {
    if (options.data && options.data.email) {
      return { data: { status: 'success', user: { email: options.data.email, role: 'user', name: 'Demo User' } } };
    }
    return { data: { status: 'success', user: { email: 'demo@example.com', role: 'user', name: 'Demo User' } } };
  }
  // Add more endpoint mocks as needed
  return { data: { success: true, message: 'Demo mode: fake response', ...options } };
};

export const apiRequest = async (options) => {
  if (FrontDemoMode) {
    return mockApiResponse(options);
  }
  return api(options);
};

export default api;