import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AccessTokenPayload } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: { id: string; email: string } }>();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException();

    try {
      const tokenPayload: AccessTokenPayload =
        await this.jwtService.verifyAsync(token);
      request.user = {
        id: tokenPayload.sub,
        email: tokenPayload.email,
      };
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }

    return true;
  }
}
