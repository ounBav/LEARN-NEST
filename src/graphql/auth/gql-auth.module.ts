import { jwtConstants } from 'src/common/guards/jwtConstants';
import { UserModule } from '../user/user.module';
import { GqlAuthResolver } from './gql-auth.resolver';
import { GqlAuthService } from './gql-auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [GqlAuthService, GqlAuthResolver, GqlAuthGuard],
})
export class GqlAuthModule {}
