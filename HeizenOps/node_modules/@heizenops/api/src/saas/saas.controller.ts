import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { SaasService } from './saas.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role, PlanType } from '@prisma/client';

@Controller('saas')
@UseGuards(JwtAuthGuard)
export class SaasController {
  constructor(private readonly saasService: SaasService) {}

  @Get('dashboard')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  getDashboardStats(@Request() req) {
    if (!req.user.tenantId) {
      throw new Error('No tenant selected');
    }
    return this.saasService.getDashboardStats(req.user.tenantId);
  }

  @Get('plans')
  getSubscriptionPlans() {
    return this.saasService.getSubscriptionPlans();
  }

  @Post('subscription')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  updateSubscription(
    @Request() req,
    @Body() body: { plan: PlanType },
  ) {
    if (!req.user.tenantId) {
      throw new Error('No tenant selected');
    }
    return this.saasService.updateSubscription(req.user.tenantId, body.plan);
  }

  @Get('analytics')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  getTenantAnalytics(@Request() req) {
    if (!req.user.tenantId) {
      throw new Error('No tenant selected');
    }
    return this.saasService.getTenantAnalytics(req.user.tenantId);
  }
}