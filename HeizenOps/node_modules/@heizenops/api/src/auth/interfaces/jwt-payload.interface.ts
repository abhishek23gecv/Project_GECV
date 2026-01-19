import { Role } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  email: string;
  tenantId: string | null;
  role?: Role;
}