import { Module } from '@nestjs/common';
import { TelegramClientService } from './telegram-client.service';
import { TelegramClientResolver } from './telegram-client.resolver';
import { TelegramApiModule } from '@lib/telegram-api';

@Module({
  imports: [TelegramApiModule],
  providers: [TelegramClientService, TelegramClientResolver],
  exports: [TelegramClientService],
})
export class TelegramClientModule {}
