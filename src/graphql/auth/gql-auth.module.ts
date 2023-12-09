/* eslint-disable prettier/prettier */
import { UserModule } from '../user/user.module';
import { GqlAuthGuard } from './gql-auth.guard';
import { GqlAuthResolver } from './gql-auth.resolver';
import { GqlAuthService } from './gql-auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: `${process.env.SECRET_KEY}`,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [GqlAuthService, GqlAuthResolver, GqlAuthGuard],
})
export class GqlAuthModule {}
