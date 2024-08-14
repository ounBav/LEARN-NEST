import {
  InjectTelegramApiService,
  TelegramApiService,
} from '@lib/telegram-api';
import { Injectable } from '@nestjs/common';
import {
  AddContactInput,
  SendMessageInput,
  SignInTelegramInput,
  StartTelegramInput,
} from './telegram-client.input';

@Injectable()
export class TelegramClientService {
  constructor(
    @InjectTelegramApiService()
    private readonly telegramApiService: TelegramApiService,
  ) {}

  async checkUserTelegramAcc(phoneNumber: string) {
    return this.telegramApiService.checkAccByPhoneNumber(phoneNumber);
  }

  async telegramSendMessage(mess: SendMessageInput) {
    return this.telegramApiService.sendMessageByUserName(
      mess.userName,
      mess.message,
    );
  }

  async searchContact(search: string) {
    return this.telegramApiService.searchContact(search);
  }

  async addContact(input: AddContactInput) {
    return this.telegramApiService.addContact(input);
  }

  async searchSticker(search: string) {
    return this.telegramApiService.searchSticker(search);
  }
  async telegramSendVerifyCode() {
    return this.telegramApiService.telegramSendVerifyCode();
  }
  async startTelegramClient(input: StartTelegramInput) {
    return this.telegramApiService.startTelegramClient(
      input.phone,
      input.verifyCode,
    );
  }

  async signInTelegramClient(input: SignInTelegramInput) {
    return this.telegramApiService.signInTelegramClient(input);
  }
  async logoutTelegramClient() {
    return this.telegramApiService.logoutTelegramClient();
  }
}
