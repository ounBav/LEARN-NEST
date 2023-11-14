/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class GqlAuthGuard implements CanActivate{
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        ){}
    canActivate(context: ExecutionContext) {

        const ctx = GqlExecutionContext.create(context);
        const handler = ctx.getHandler();
    }
}



