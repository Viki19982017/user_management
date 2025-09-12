import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';

class RegisterRequestDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

class LoginRequestDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterRequestDto) {
    return this.authService.register(body);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    return this.authService.login(body);
  }
}
