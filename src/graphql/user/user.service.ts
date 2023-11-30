/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUserInput } from './user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    const USER = await this.userRepository.find();
    return USER;
  }

  async findUserById(id: string): Promise<UserEntity> {
    const USER = await this.userRepository.findOne({ where: { id } });
    return USER;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const USER = await this.userRepository.findOne({ where: { email } });
    return USER;
  }

  async findUserByUserName(username: string): Promise<UserEntity> {
    const USER = await this.userRepository.findOne({ where: { username } });
    return USER;
  }

  async createUser(createUser: CreateUserInput): Promise<UserEntity> {
    const password = await bcrypt.hash(createUser.password, 10);
    const USER: UserEntity = new UserEntity();
    USER.first_name = createUser.first_name;
    USER.last_name = createUser.last_name;
    USER.username = createUser.username;
    USER.email = createUser.email;
    USER.password = password;
    USER.roleId = createUser.roleId;
    USER.status = createUser.status;
    await this.userRepository.save(USER);
    return USER;
  }
}
