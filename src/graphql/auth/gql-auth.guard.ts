import {
  CanActivate,
  ContextType,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { RoleEntity, UserEntity } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtPayload } from './gql-auth.interface';
import * as T from '../../common/types/enum';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const request = this.getRequest(context);
    const authToken = request.get('authorization') || '';
    const [type, token] = authToken.split(' ');

    if (!roles) return true;

    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid token type');
    }

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    let payload: jwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
    } catch (e: any) {
      throw new UnauthorizedException(e.name + ' ' + e.message);
    }

    // Validate user roles
    const user = await this.userRepo.findOne({
      where: { id: payload.id, status: T.EntityStatus.ACTIVE },
    });

    if (!user) {
      throw new ForbiddenException('Unknown User');
    }

    const role = await this.roleRepo.findOne({
      where: { id: user.roleId, status: T.EntityStatus.ACTIVE },
    });

    if (!roles.length || !role || !roles.includes(role.name)) {
      throw new ForbiddenException('Invalid user role');
    }

    // Assign the payload to the request object
    request['user'] = payload;

    return true;
  }

  private getRequest(context: ExecutionContext) {
    return context.getType<ContextType | 'graphql'>() === 'graphql'
      ? GqlExecutionContext.create(context).getContext().req
      : context.switchToHttp().getRequest();
  }
}
