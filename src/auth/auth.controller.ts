import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'register success' })
  @ApiResponse({ status: 400, description: 'email is duplicate' })
  async register(@Body() createUserDTO: CreateUserDto): Promise<object> {
    return await this.authService.register(createUserDTO);
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'login success' })
  @ApiResponse({ status: 403, description: 'email not Found' })
  async login(@Body() loginDTO: LoginDto): Promise<any> {
    return await this.authService.login(loginDTO);
  }
}
