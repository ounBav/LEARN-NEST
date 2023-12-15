// import {
//   CanActivate,
//   ContextType,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './jwtConstants';
// import { GqlExecutionContext } from '@nestjs/graphql';
// @Injectable()
// export class GqlAuthGuard implements CanActivate {
//   private reflector: Reflector;
//   private jwtService: JwtService;
//   constructor() {}
//   async canActivate(context: ExecutionContext) {
//     const handler = context.getHandler();
//     const roles = this.reflector.get<string[]>('roles', handler);
//     console.log(roles);

//     if (roles === undefined) return true;

//     const request = this.getRequest(context);
//     const authToken = request.get('authorization') || '';
//     const [type, token] = authToken.split(' ');
//     if (type !== 'Bearer')
//       throw new UnauthorizedException('invalid provided token');

//     if (!token) {
//       throw new UnauthorizedException('Token is missing.');
//     }

//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: jwtConstants.secret,
//       });
//       // 💡 We're assigning the payload to the request object here
//       // so that we can access it in our route handlers
//       request['user'] = payload;
//       console.log(payload);
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }

//   private getRequest(context: ExecutionContext) {
//     if (context.getType<ContextType | 'graphql'>() === 'graphql') {
//       return GqlExecutionContext.create(context).getContext().req;
//     }
//     return context.switchToHttp().getRequest();
//   }
// }
