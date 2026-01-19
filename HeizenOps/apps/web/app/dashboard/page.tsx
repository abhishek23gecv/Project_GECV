import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './dashboard-client';

// Server-side data fetching
async function getDashboardData(token: string) {
  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:3001/api/v1'}/saas/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      if (response.status === 401) {
        redirect('/login');
      }
      throw new Error('Failed to fetch dashboard data');
    }

    return await response.json();
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return null;
  }
}

async function getUserProfile(token: string) {
  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:3001/api/v1'}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        redirect('/login');
      }
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('User profile fetch error:', error);
    return null;
  }
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  // Fetch data server-side
  const [dashboardData, userProfile] = await Promise.all([
    getDashboardData(token),
    getUserProfile(token),
  ]);

  if (!userProfile) {
    redirect('/login');
  }

  return (
    <DashboardClient 
      initialDashboardData={dashboardData}
      userProfile={userProfile}
    />
  );
}