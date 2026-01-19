# HeizenOps Project Structure

## Overview
HeizenOps is a production-ready monorepo built with Turborepo, featuring a clean separation between frontend (Next.js) and backend (NestJS) applications.

## Directory Structure

```
HeizenOps/
├── apps/
│   ├── api/                          # NestJS Backend API
│   │   ├── prisma/
│   │   │   ├── schema.prisma         # Database schema
│   │   │   └── seed.ts               # Database seeding
│   │   ├── src/
│   │   │   ├── auth/                 # Authentication module
│   │   │   │   ├── decorators/       # Custom decorators (Roles)
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── guards/           # Auth guards (JWT, Local, Roles)
│   │   │   │   ├── interfaces/       # TypeScript interfaces
│   │   │   │   ├── strategies/       # Passport strategies
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   └── auth.service.ts
│   │   │   ├── common/
│   │   │   │   └── filters/          # Global exception filters
│   │   │   ├── prisma/               # Prisma service
│   │   │   ├── saas/                 # SaaS-specific features
│   │   │   ├── tenants/              # Multi-tenant management
│   │   │   ├── users/                # User management
│   │   │   ├── app.module.ts         # Root module
│   │   │   └── main.ts               # Application entry point
│   │   ├── .env                      # Environment variables
│   │   ├── nest-cli.json             # NestJS CLI configuration
│   │   ├── package.json              # Backend dependencies
│   │   └── tsconfig.json             # TypeScript configuration
│   └── web/                          # Next.js Frontend
│       ├── app/                      # App Router (Next.js 14)
│       │   ├── dashboard/            # Protected dashboard pages
│       │   ├── login/                # Authentication pages
│       │   ├── register/
│       │   ├── globals.css           # Global styles
│       │   ├── layout.tsx            # Root layout
│       │   ├── page.tsx              # Home page
│       │   └── providers.tsx         # React Query provider
│       ├── lib/                      # Utility libraries
│       │   ├── api.ts                # API service layer
│       │   └── auth.ts               # Authentication hooks
│       ├── next.config.js            # Next.js configuration
│       ├── package.json              # Frontend dependencies
│       ├── postcss.config.js         # PostCSS configuration
│       ├── tailwind.config.js        # Tailwind CSS configuration
│       └── tsconfig.json             # TypeScript configuration
├── packages/                         # Shared packages (future)
├── .gitignore                        # Git ignore rules
├── package.json                      # Root package.json
├── README.md                         # Project documentation
└── turbo.json                        # Turborepo configuration
```

## Key Architecture Decisions

### Backend (NestJS)
- **Modular Architecture**: Each feature is organized into its own module
- **Domain-Driven Design**: Clear separation of concerns with services, controllers, and DTOs
- **Prisma ORM**: Type-safe database access with MySQL
- **JWT Authentication**: Stateless authentication with role-based access control
- **Global Exception Handling**: Centralized error handling and logging

### Frontend (Next.js)
- **App Router**: Using Next.js 14's new app directory structure
- **Server-Side Rendering**: Dashboard page demonstrates SSR with protected routes
- **React Query**: Client-side state management and caching
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **TypeScript**: Full type safety across the application

### Database Schema
- **Multi-tenant Architecture**: Users can belong to multiple tenants with different roles
- **Role-Based Access Control**: Hierarchical permission system
- **Subscription Management**: Built-in billing and plan management

## Development Workflow

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database**
   ```bash
   # Navigate to API directory
   cd apps/api
   
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # Seed database (optional)
   npx prisma db seed
   ```

3. **Start Development Servers**
   ```bash
   # From root directory
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="mysql://user:password@localhost:3306/heizenops"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
```

## Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Request rate limiting
- CORS protection
- Input validation and sanitization
- Global exception handling

## Scalability Features

- Multi-tenant architecture
- Horizontal scaling ready
- Database connection pooling
- Caching with React Query
- Server-side rendering for SEO
- API versioning support