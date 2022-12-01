import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schemas';

export const USER_REPOSITORY = 'userReposiroty';

export interface IUserRepository {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
