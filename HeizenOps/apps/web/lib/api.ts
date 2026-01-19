import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  subscription: any;
  recentActivity: any[];
}

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          Cookies.remove('accessToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/login', credentials);
    
    // Store token in cookie
    Cookies.set('accessToken', response.data.accessToken, { expires: 7 });
    
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/register', data);
    
    // Store token in cookie
    Cookies.set('accessToken', response.data.accessToken, { expires: 7 });
    
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } finally {
      Cookies.remove('accessToken');
    }
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await this.api.get('/auth/profile');
    return response.data;
  }

  async switchTenant(tenantId: string): Promise<{ accessToken: string }> {
    const response = await this.api.post(`/auth/switch-tenant/${tenantId}`);
    
    // Update token in cookie
    Cookies.set('accessToken', response.data.accessToken, { expires: 7 });
    
    return response.data;
  }

  // User methods
  async getUserTenants(): Promise<any[]> {
    const response = await this.api.get('/users/me/tenants');
    return response.data;
  }

  // Tenant methods
  async createTenant(data: { name: string; slug: string }): Promise<Tenant> {
    const response = await this.api.post('/tenants', data);
    return response.data;
  }

  async getTenant(id: string): Promise<Tenant> {
    const response = await this.api.get(`/tenants/${id}`);
    return response.data;
  }

  // SaaS methods
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await this.api.get('/saas/dashboard');
    return response.data;
  }

  async getSubscriptionPlans(): Promise<any[]> {
    const response = await this.api.get('/saas/plans');
    return response.data;
  }

  async updateSubscription(plan: string): Promise<any> {
    const response = await this.api.post('/saas/subscription', { plan });
    return response.data;
  }

  async getTenantAnalytics(): Promise<any> {
    const response = await this.api.get('/saas/analytics');
    return response.data;
  }
}

export const apiService = new ApiService();