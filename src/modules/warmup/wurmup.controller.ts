import { Controller, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { WarmupService } from './warmup.service';

@Injectable()
@Controller()
export class WarmupController implements OnApplicationBootstrap {
  constructor(private readonly warmupService: WarmupService) {}

  onApplicationBootstrap() {
    this.warmupService.updateTimers();
  }
}
