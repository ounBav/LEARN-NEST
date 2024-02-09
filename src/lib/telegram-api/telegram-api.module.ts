import { Module } from '@nestjs/common';

import { TelegramApiProvider } from './telegram-api.provider';

@Module({
  providers: [TelegramApiProvider],
  exports: [TelegramApiProvider],
})
export class TelegramApiModule {}
