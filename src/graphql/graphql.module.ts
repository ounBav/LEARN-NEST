import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { NotificationModule } from './messages/notification.module';
import { RoleModule } from './role/role.module';
import { ChatModule } from './chat/chat.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { BotModule } from './bot/bot.module';
import { TelegramClientModule } from './telegram-client/telegram-client.module';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    ChatModule,
    RoleModule,
    UserModule,
    NotificationModule,
    BotModule,
    TelegramClientModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    }),
  ],
})
export class GraphQLConfigModule {}
