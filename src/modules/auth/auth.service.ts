import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RequestUser } from '../users/users.controller';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  //validate a user
  async validateUser(
    useremail: string,
    password: string,
  ): Promise<RequestUser | null> {
    const user = await this.userService.findByEmail(useremail);
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.role === Role.ADMIN,
      };
    }

    return null;
  }
}
