import { UserModule } from '../user/user.module';
import { GqlAuthGuard } from './gql-auth.guard';
import { GqlAuthResolver } from './gql-auth.resolver';
import { GqlAuthService } from './gql-auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  providers: [GqlAuthService, GqlAuthResolver, GqlAuthGuard],
})
export class GqlAuthModule {}
