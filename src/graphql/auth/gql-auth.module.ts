import { jwtConstants } from 'src/common/guards/jwtConstants';
import { UserModule } from '../user/user.module';
import { GqlAuthResolver } from './gql-auth.resolver';
import { GqlAuthService } from './gql-auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GqlAuthGuard } from './gql-auth.guard';
import { Repository } from 'typeorm';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [GqlAuthService, GqlAuthResolver, GqlAuthGuard, Repository],
})
export class GqlAuthModule {}
