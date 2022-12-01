import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDTO: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(loginDTO.email);
    if (!user) {
      throw new ForbiddenException('email not Found');
    }

    const passwordMatch = compareSync(loginDTO.password, user.password);
    if (!passwordMatch) {
      throw new ForbiddenException('Email and password do not match');
    }

    const payload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDTO: CreateUserDto): Promise<object> {
    const salt = genSaltSync();
    const hash = await hashSync(createUserDTO.password, salt);

    createUserDTO.password = hash;

    return this.userService.createUser(createUserDTO);
  }
}
