import { Module } from '@nestjs/common';
import { SaasService } from './saas.service';
import { SaasController } from './saas.controller';

@Module({
  providers: [SaasService],
  controllers: [SaasController],
})
export class SaasModule {}