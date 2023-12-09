/* eslint-disable prettier/prettier */
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { NotificationModule } from './messages/notification.module';
import { RoleModule } from './role/role.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ChatModule,
    RoleModule,
    UserModule,
    NotificationModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    }),
  ],
})
export class GraphQLConfigModule {}
