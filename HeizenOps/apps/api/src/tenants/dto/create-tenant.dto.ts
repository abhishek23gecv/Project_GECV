import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { PlanType } from '@prisma/client';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  domain?: string;

  @IsEnum(PlanType)
  @IsOptional()
  plan?: PlanType;
}