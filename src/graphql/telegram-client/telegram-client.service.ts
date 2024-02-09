import {
  InjectTelegramApiService,
  TelegramApiService,
} from '@lib/telegram-api';
import { Injectable } from '@nestjs/common';
import { SendMessageInput } from './telegram-client.input';

@Injectable()
export class TelegramClientService {
  constructor(
    @InjectTelegramApiService()
    private readonly telegramApiService: TelegramApiService,
  ) {}

  async checkUserTelegramAcc(phoneNumber: string) {
    return this.telegramApiService.checkAccByPhoneNumber(phoneNumber);
  }

  async sendMessageByUserName(mess: SendMessageInput) {
    return this.telegramApiService.sendMessageByUserName(
      mess.userName,
      mess.message,
    );
  }
}
