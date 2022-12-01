import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IUser } from './interface/user.interface';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getProfile(@Req() request: any): Promise<IUser> {
    const { email } = request.user;

    return this.userService.getProfile(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('order-history')
  async getOrderHistory(@Req() request: any) {
    const { userId } = request.user;

    return this.userService.findOrderHistory(userId);
  }
}
