import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { AssignUserDto } from './dto/assign-user.dto';
import { UnAssignUserDto } from './dto/un-assign-user.dto';
import { UserAssignService } from './users-assign.service';

@Controller('assign')
export class UserAssaignController {
  constructor(private readonly userAssignService: UserAssignService) {}

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userAssignService.getUserAssigns(userId);
  }

  @Post()
  create(@Body() assignUserDto: AssignUserDto) {
    return this.userAssignService.assignToHairdresser(assignUserDto);
  }

  @Patch()
  update(@Request() req, @Body() unAssignUserDto: UnAssignUserDto) {
    return this.userAssignService.unAssignToHairdresser(req, unAssignUserDto);
  }
}
