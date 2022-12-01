import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserModel } from '../schemas/user.schemas';
import { IUserRepository } from './user.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';

export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await new this.userModel(createUserDto).save();
      return newUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException({
          message: 'email is duplicate',
        });
      }

      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email }).lean();
    } catch (error) {
      throw new Error(error);
    }
  }
}
