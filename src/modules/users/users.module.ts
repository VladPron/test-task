import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserAssaignController } from './users-assign.controller';
import { UserAssignService } from './users-assign.service';
import { WarmupModule } from '../warmup/warmup.module';

@Module({
  imports: [WarmupModule],
  controllers: [UserController, UserAssaignController],
  providers: [UserService, UserAssignService],
  exports: [UserService],
})
export class UserModule {}
