import { Module } from '@nestjs/common';
import { WarmupService } from './warmup.service';
import { WarmupController } from './wurmup.controller';

@Module({
  controllers: [WarmupController],
  providers: [WarmupService],
  exports: [WarmupService],
})
export class WarmupModule {}
