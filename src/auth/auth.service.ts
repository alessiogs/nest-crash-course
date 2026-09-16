import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/users/entity/user';
import { JwtService } from '@nestjs/jwt';

type UserDetail = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  authenticate(payload: LoginUserDto) {
    const user = this.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  validateUser(payload: LoginUserDto): UserDetail | null {
    const user = this.usersService.getUserByEmail(payload.email);
    if (!user || payload.password !== user.password) {
      return null;
    }

    const { id, name, email } = user;
    return { id, name, email };
  }

  signIn(user: UserDetail): UserDetail & { accessToken: string } {
    const tokenPayload = {
      sub: user.id,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(tokenPayload);

    return { accessToken, ...user };
  }
}
