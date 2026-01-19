import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanType, SubscriptionStatus } from '@prisma/client';

@Injectable()
export class SaasService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats(tenantId: string) {
    const [
      totalUsers,
      activeUsers,
      subscription,
      recentActivity,
    ] = await Promise.all([
      this.prisma.tenantMember.count({
        where: { tenantId },
      }),
      this.prisma.tenantMember.count({
        where: {
          tenantId,
          user: { isActive: true },
        },
      }),
      this.prisma.subscription.findUnique({
        where: { tenantId },
      }),
      this.prisma.tenantMember.findMany({
        where: { tenantId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    return {
      totalUsers,
      activeUsers,
      subscription,
      recentActivity,
    };
  }

  async getSubscriptionPlans() {
    return [
      {
        id: 'free',
        name: 'Free',
        type: PlanType.FREE,
        price: 0,
        features: ['Up to 5 users', 'Basic features', 'Email support'],
      },
      {
        id: 'basic',
        name: 'Basic',
        type: PlanType.BASIC,
        price: 29,
        features: ['Up to 25 users', 'Advanced features', 'Priority support'],
      },
      {
        id: 'pro',
        name: 'Pro',
        type: PlanType.PRO,
        price: 99,
        features: ['Up to 100 users', 'All features', '24/7 support'],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        type: PlanType.ENTERPRISE,
        price: 299,
        features: ['Unlimited users', 'Custom features', 'Dedicated support'],
      },
    ];
  }

  async updateSubscription(tenantId: string, plan: PlanType) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { subscription: true },
    });

    if (!tenant) {
      throw new Error('Tenant not found');
    }

    // Update tenant plan
    await this.prisma.tenant.update({
      where: { id: tenantId },
      data: { plan },
    });

    // Create or update subscription
    if (tenant.subscription) {
      return this.prisma.subscription.update({
        where: { tenantId },
        data: {
          plan,
          status: SubscriptionStatus.ACTIVE,
          startDate: new Date(),
        },
      });
    } else {
      return this.prisma.subscription.create({
        data: {
          tenantId,
          plan,
          status: SubscriptionStatus.ACTIVE,
          startDate: new Date(),
        },
      });
    }
  }

  async getTenantAnalytics(tenantId: string) {
    const [
      userGrowth,
      planDistribution,
      activityMetrics,
    ] = await Promise.all([
      this.getUserGrowthData(tenantId),
      this.getPlanDistribution(),
      this.getActivityMetrics(tenantId),
    ]);

    return {
      userGrowth,
      planDistribution,
      activityMetrics,
    };
  }

  private async getUserGrowthData(tenantId: string) {
    // This would typically involve more complex date-based queries
    // For now, returning mock data structure
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [10, 15, 20, 25, 30, 35],
    };
  }

  private async getPlanDistribution() {
    const distribution = await this.prisma.tenant.groupBy({
      by: ['plan'],
      _count: {
        plan: true,
      },
    });

    return distribution.map(item => ({
      plan: item.plan,
      count: item._count.plan,
    }));
  }

  private async getActivityMetrics(tenantId: string) {
    const totalMembers = await this.prisma.tenantMember.count({
      where: { tenantId },
    });

    const activeMembers = await this.prisma.tenantMember.count({
      where: {
        tenantId,
        user: { isActive: true },
      },
    });

    return {
      totalMembers,
      activeMembers,
      activityRate: totalMembers > 0 ? (activeMembers / totalMembers) * 100 : 0,
    };
  }
}