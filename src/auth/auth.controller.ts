import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(
    @Request() request: Request & { user: { id: string; email: string } },
  ) {
    return request.user;
  }

  @Post('login')
  login(@Body(ValidationPipe) payload: LoginUserDto) {
    return this.authService.authenticate(payload);
  }
}
