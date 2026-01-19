import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, LoginCredentials, RegisterData, AuthResponse } from './api';
import Cookies from 'js-cookie';

// Auth hooks using React Query
export function useAuth() {
  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: () => apiService.getProfile(),
    retry: false,
    enabled: !!Cookies.get('accessToken'),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => apiService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      queryClient.setQueryData(['auth', 'profile'], { user: data.user });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: RegisterData) => apiService.register(data),
    onSuccess: (data: AuthResponse) => {
      queryClient.setQueryData(['auth', 'profile'], { user: data.user });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => apiService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useSwitchTenant() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (tenantId: string) => apiService.switchTenant(tenantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useUserTenants() {
  return useQuery({
    queryKey: ['auth', 'tenants'],
    queryFn: () => apiService.getUserTenants(),
    enabled: !!Cookies.get('accessToken'),
  });
}