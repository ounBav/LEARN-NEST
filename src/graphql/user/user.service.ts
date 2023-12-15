import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUserInput } from './user.input';
import * as bcrypt from 'bcrypt';
import { EntityStatus } from 'src/common/types/enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /************************
   * QUERY
   **********************/
  async findAllUsers(): Promise<UserEntity[]> {
    const USER = await this.userRepository.find();
    return USER;
  }

  async findUserById(id: string): Promise<UserEntity> {
    return this.validateUser(id);
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const USER = await this.userRepository.findOne({ where: { email } });
    return USER;
  }

  async findUserByUserName(userName: string) {
    return this.validateUserName(userName);
  }

  /***********************
   *  MUTATION
   **********************/
  async createUser(createUser: CreateUserInput): Promise<UserEntity> {
    const password = await bcrypt.hash(createUser.password, 10);
    const user = await this.userRepository.findOne({
      where: { username: createUser.username, status: EntityStatus.ACTIVE },
    });

    if (user) {
      throw new BadRequestException('This user is already existed.');
    }

    return this.userRepository.save({ ...createUser, password });
  }

  /***********************
   *  PRIVATE FUNCTION
   **********************/
  async validateUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, status: EntityStatus.ACTIVE },
    });

    if (!user) {
      throw new BadRequestException('User is Undefine');
    }

    return user;
  }

  async validateUserName(name: string) {
    const user = await this.userRepository.findOne({
      where: { username: name, status: EntityStatus.ACTIVE },
    });

    if (!user) {
      throw new BadRequestException('User is Undefine');
    }

    return user;
  }
}
