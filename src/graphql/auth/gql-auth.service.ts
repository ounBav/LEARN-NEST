import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/index';
import { LoginInput } from './gql-auth.input';
import { UserService } from '../user/user.service';

@Injectable()
export class GqlAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  async login(LoginInput: LoginInput) {
    return this.userService.findUserByUserName(LoginInput.username);
  }
}
