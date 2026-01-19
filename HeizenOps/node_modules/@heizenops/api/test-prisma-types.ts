// Test file to verify Prisma types are working
import { PrismaClient, Role, PlanType, SubscriptionStatus } from '@prisma/client';

console.log('Role enum:', Role);
console.log('PlanType enum:', PlanType);
console.log('SubscriptionStatus enum:', SubscriptionStatus);

const prisma = new PrismaClient();

// Test that the types are available
const testRole: Role = Role.ADMIN;
const testPlan: PlanType = PlanType.PRO;
const testStatus: SubscriptionStatus = SubscriptionStatus.ACTIVE;

console.log('Test successful:', { testRole, testPlan, testStatus });