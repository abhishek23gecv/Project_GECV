import { PrismaClient, Role, PlanType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 12);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@heizenops.com' },
    update: {},
    create: {
      email: 'demo@heizenops.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
      isActive: true,
    },
  });

  // Create demo tenant
  const demoTenant = await prisma.tenant.upsert({
    where: { slug: 'demo-company' },
    update: {},
    create: {
      name: 'Demo Company',
      slug: 'demo-company',
      plan: PlanType.PRO,
      createdById: demoUser.id,
    },
  });

  // Add user as admin to tenant
  await prisma.tenantMember.upsert({
    where: {
      userId_tenantId: {
        userId: demoUser.id,
        tenantId: demoTenant.id,
      },
    },
    update: {},
    create: {
      userId: demoUser.id,
      tenantId: demoTenant.id,
      role: Role.ADMIN,
    },
  });

  // Create additional demo users
  const users = [
    { email: 'john@heizenops.com', firstName: 'John', lastName: 'Doe' },
    { email: 'jane@heizenops.com', firstName: 'Jane', lastName: 'Smith' },
    { email: 'bob@heizenops.com', firstName: 'Bob', lastName: 'Johnson' },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: hashedPassword,
        isActive: true,
      },
    });

    // Add as member to demo tenant
    await prisma.tenantMember.upsert({
      where: {
        userId_tenantId: {
          userId: user.id,
          tenantId: demoTenant.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        tenantId: demoTenant.id,
        role: Role.MEMBER,
      },
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('📧 Demo credentials:');
  console.log('   Email: demo@heizenops.com');
  console.log('   Password: demo123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });