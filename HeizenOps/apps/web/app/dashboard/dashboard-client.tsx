'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Users, 
  Activity, 
  Settings, 
  LogOut,
  BarChart3,
  Shield,
  CreditCard
} from 'lucide-react';
import { apiService } from '@/lib/api';
import { useLogout, useSwitchTenant, useUserTenants } from '@/lib/auth';

interface DashboardClientProps {
  initialDashboardData: any;
  userProfile: any;
}

export default function DashboardClient({ 
  initialDashboardData, 
  userProfile 
}: DashboardClientProps) {
  const router = useRouter();
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  
  const logout = useLogout();
  const switchTenant = useSwitchTenant();
  const { data: userTenants } = useUserTenants();

  // Use React Query for client-side data fetching with SSR data as initial data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => apiService.getDashboardStats(),
    initialData: initialDashboardData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const handleLogout = async () => {
    await logout.mutateAsync();
    router.push('/');
  };

  const handleTenantSwitch = async (tenantId: string) => {
    try {
      await switchTenant.mutateAsync(tenantId);
      setSelectedTenant(tenantId);
      // Refresh the page to get new tenant data
      router.refresh();
    } catch (error) {
      console.error('Failed to switch tenant:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">HeizenOps</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Tenant Selector */}
              {userTenants && userTenants.length > 0 && (
                <select
                  className="input max-w-xs"
                  value={selectedTenant || ''}
                  onChange={(e) => handleTenantSwitch(e.target.value)}
                >
                  <option value="">Select Tenant</option>
                  {userTenants.map((membership: any) => (
                    <option key={membership.tenant.id} value={membership.tenant.id}>
                      {membership.tenant.name} ({membership.role})
                    </option>
                  ))}
                </select>
              )}
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {userProfile.user.firstName} {userProfile.user.lastName}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userProfile.user.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your SaaS platform today.
          </p>
        </div>

        {/* Stats Cards */}
        {dashboardData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.totalUsers || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.activeUsers || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Plan</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.subscription?.plan || 'FREE'}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-2xl font-bold text-green-600">Active</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h2>
              {dashboardData?.recentActivity?.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.user.firstName} {activity.user.lastName} joined
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No recent activity to display
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full btn btn-primary flex items-center justify-center">
                  <Users className="h-4 w-4 mr-2" />
                  Invite Users
                </button>
                <button className="w-full btn btn-secondary flex items-center justify-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
                <button className="w-full btn btn-secondary flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </button>
              </div>
            </div>

            {/* Subscription Info */}
            {dashboardData?.subscription && (
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Subscription
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Plan:</span>
                    <span className="text-sm font-medium">
                      {dashboardData.subscription.plan}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className="text-sm font-medium text-green-600">
                      {dashboardData.subscription.status}
                    </span>
                  </div>
                </div>
                <button className="w-full btn btn-primary mt-4">
                  Upgrade Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}