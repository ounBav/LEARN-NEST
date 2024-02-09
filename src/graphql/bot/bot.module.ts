import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotResolver } from './bot.resolver';

@Module({
  providers: [BotService, BotResolver],
  exports: [BotService, BotResolver],
})
export class BotModule {}
