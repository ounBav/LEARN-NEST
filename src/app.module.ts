import { GqlAuthModule } from './graphql/auth/gql-auth.module';
import { TypeormModule } from './lib/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLConfigModule } from './graphql/graphql.module';

@Module({
  imports: [
    GqlAuthModule,
    TypeormModule,
    GraphQLConfigModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
