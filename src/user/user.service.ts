import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './repositories/user.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interface/user.interface';
import { OrderService } from '../order/order.service';
import { User } from './schemas/user.schemas';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository,
    private orderService: OrderService,
  ) {}

  async getProfile(email: string): Promise<IUser> {
    // eslint-disable-next-line prefer-const
    let user = await this.userRepository.findByEmail(email);

    if (user) {
      user.password = undefined;
      user.createdAt = undefined;
      user.updateAt = undefined;
    }

    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<object> {
    const user = await this.userRepository.createUser(createUserDto);

    if (user) {
      return { message: 'register success' };
    }
  }

  async findOrderHistory(userId: string) {
    const orders = await this.orderService.findOrderByUserId(userId);

    return orders;
  }
}
