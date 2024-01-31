/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/index';
import { LoginInput } from './gql-auth.input';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './gql-auth.interface';

@Injectable()
export class GqlAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(LoginInput: LoginInput) {
    const USER = await this.userService.findUserByUserName(LoginInput.username);
    const isExistedUser = await bcrypt.compare(
      LoginInput.password,
      USER.password,
    );
    if (!isExistedUser) {
      throw new BadRequestException('Bad request user login');
    }
    const jwtPayload: jwtPayload = {
      id: USER.id,
      first_name: USER.first_name,
      last_name: USER.last_name,
      username: USER.username,
      email: USER.email,
      role: USER.roleId,
      status: USER.status,
      user_type: USER.userType,
      login_date: new Date().toISOString(),
    };

    return {
      user: USER,
      token: this.jwtService.sign(jwtPayload),
    };
  }
}
