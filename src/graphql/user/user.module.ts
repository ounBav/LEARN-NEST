/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserLoader } from './user.loader';

@Module({
  imports: [],
  providers: [UserResolver, UserService, UserLoader],
  exports: [UserService],
})
export class UserModule {}
