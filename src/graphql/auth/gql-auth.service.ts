/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/index';
import { LoginInput } from './gql-auth.input';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GqlAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  async login(LoginInput: LoginInput) {
    const USER = await this.userService.findUserByUserName(LoginInput.username);
    const isExistedUser = await bcrypt.compare(LoginInput.password, USER.password);
    if(! isExistedUser){
      throw new BadRequestException('Bad request user login')
    }
    return USER
  }
}
