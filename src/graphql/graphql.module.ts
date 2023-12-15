/* eslint-disable prettier/prettier */
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { NotificationModule } from './messages/notification.module';
import { RoleModule } from './role/role.module';
import { ChatModule } from './chat/chat.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    CategoryModule,
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
