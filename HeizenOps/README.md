# HeizenOps - Enterprise SaaS Platform

A scalable full-stack SaaS platform built with the T3 Stack, following Domain-Driven Design (DDD) and Clean Architecture principles.

## Tech Stack

- **Frontend:** Next.js 14 (TypeScript, App Router, SSR)
- **Backend:** NestJS (TypeScript, Modular Architecture)
- **Database:** MySQL with Prisma ORM
- **Authentication:** JWT with Role-Based Access Control (RBAC)
- **Monorepo:** Turborepo for workspace management

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │───▶│   NestJS API    │───▶│   MySQL DB      │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Getting Started

1. Install dependencies: `npm install`
2. Setup database: `npm run db:setup`
3. Start development: `npm run dev`

## Project Structure

See the detailed folder structure in the project directories.