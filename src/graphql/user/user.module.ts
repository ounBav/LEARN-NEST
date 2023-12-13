/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserLoader } from './user.loader';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [UserResolver, UserService, UserLoader, JwtService],
  exports: [UserService],
})
export class UserModule {}
