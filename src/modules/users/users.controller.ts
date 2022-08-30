import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';

type LogoutType = {
  msg: string;
};

export type RequestUser = {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
};

type LoginType = {
  User: RequestUser;
  msg: string;
};

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  getHello(@Request() req): RequestUser {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): LoginType {
    return { User: req.user, msg: 'User logged in' };
  }

  @Get('/logout')
  logout(@Request() req): LogoutType {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
