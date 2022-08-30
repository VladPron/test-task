import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findByEmail(useremail: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: useremail,
      },
    });

    if (!user) throw new NotFoundException(`User with not found`);
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({ data: createUserDto });
    delete newUser.password;
    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    delete updatedUser.password;
    return updatedUser;
  }

  async remove(id: string): Promise<string> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return 'User deleted';
  }
}
