import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { RequestUser } from '../users/users.controller';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(useremail: string, password: string): Promise<RequestUser> {
    //change useremail to lower case
    const userEmail = useremail.toLowerCase();
    const user = await this.authService.validateUser(userEmail, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
