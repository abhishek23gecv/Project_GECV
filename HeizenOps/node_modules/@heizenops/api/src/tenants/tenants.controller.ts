import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('tenants')
@UseGuards(JwtAuthGuard)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto, @Request() req) {
    return this.tenantsService.create(createTenantDto, req.user.id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER)
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }

  @Post(':id/members')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  addMember(@Param('id') tenantId: string, @Body() addMemberDto: AddMemberDto) {
    return this.tenantsService.addMember(
      tenantId,
      addMemberDto.userId,
      addMemberDto.role,
    );
  }

  @Delete(':id/members/:userId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  removeMember(@Param('id') tenantId: string, @Param('userId') userId: string) {
    return this.tenantsService.removeMember(tenantId, userId);
  }

  @Patch(':id/members/:userId/role')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  updateMemberRole(
    @Param('id') tenantId: string,
    @Param('userId') userId: string,
    @Body() updateMemberRoleDto: UpdateMemberRoleDto,
  ) {
    return this.tenantsService.updateMemberRole(
      tenantId,
      userId,
      updateMemberRoleDto.role,
    );
  }
}