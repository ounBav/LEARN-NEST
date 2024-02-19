import { ConfigService } from '@lib/configs';
import { BadRequestException } from '@nestjs/common';
import { randBetween } from 'big-integer';
import BigInteger = require('big-integer');
import { TelegramUser } from 'src/graphql/telegram-client/telegram-client.model';
// import { TelegramUser } from 'src/graphql/telegram-client/telegram-client.model';
import { Api, TelegramClient } from 'telegram';
import { TelegramApiConfig } from './telegram-api.dto';

export class TelegramApiService {
  constructor(
    private readonly client: TelegramClient,
    private readonly configService: ConfigService,
  ) {}
  async checkAccByPhoneNumber(phoneNumber: string) {
    const result: Api.contacts.ImportedContacts = await this.client.invoke(
      new Api.contacts.ImportContacts({
        contacts: [
          new Api.InputPhoneContact({
            clientId: randBetween(0, 2 ** 63),
            firstName: '+855',
            lastName: phoneNumber,
            phone: `+855${phoneNumber}`,
          }),
        ],
      }),
    );
    const user: any = result.users[0];
    // console.log(parseInt(user.id), user.accessHash);
    if (!result.users.length || !user.username) {
      if (result.users.length) {
        this.deleteContact(user.id, user.accessHash);
      }
      throw new BadRequestException(
        `This Phone Number +855${phoneNumber} Don't Have Telegram Account`,
      );
    }
    this.deleteContact(user.id, user.accessHash);
    const recipientAccount = `https://t.me/${user?.username}`;
    return { recipientAccount };
  }

  async deleteContact(userId: any, accessHash: any) {
    await this.client.invoke(
      new Api.contacts.DeleteContacts({
        id: [
          new Api.InputUser({
            userId,
            accessHash,
          }),
        ],
      }),
    );
  }

  async sendMessageByUserName(userName: string, mess: string) {
    const message = await this.client.sendMessage(userName, { message: mess });
    console.log(message);
    setTimeout(() => {
      this.deleteMessage(message.id);
    }, 50000);
    return true;
  }

  async deleteMessage(id: number) {
    const result = await this.client.invoke(
      new Api.messages.DeleteMessages({
        id: [id],
        revoke: true,
      }),
    );
    console.log(`Message Deleted. id = ${id}`);
    console.log(result);
  }

  async searchContact(search: string) {
    const foundContacts = await this.client.invoke(
      new Api.contacts.Search({
        q: search,
        limit: 10,
      }),
    );
    const results: TelegramUser[] = [];
    foundContacts.users.forEach((user) => {
      const customUser = {
        firstName: 'firstName' in user ? user.firstName : '',
        lastName: 'lastName' in user ? user.lastName : '',
        phone: 'phone' in user ? user.phone : '',
        username: 'username' in user ? user.username : '',
        bot: 'bot' in user ? user.bot : false,
        scam: 'scam' in user ? user.scam : false,
        fake: 'fake' in user ? user.fake : false,
        premium: 'premium' in user ? user.premium : false,
      };
      results.push(customUser);
    });
    return results;
  }

  async searchSticker(search: string) {
    const result = await this.client.invoke(
      new Api.messages.SearchStickerSets({
        q: search,
        hash: BigInteger('-4156887774564'),
        excludeFeatured: true,
      }),
    );

    console.log(result);

    return true;
  }

  async sendReachIcon() {
    const result = await this.client.invoke(
      new Api.messages.SendReaction({
        peer: 'me',
        msgId: 43,
        big: true,
        reaction: [],
      }),
    );
    console.log(result);
    return true;
  }

  async addContact(contactInfo: AddContact) {
    const contact = await this.client.invoke(
      new Api.contacts.AddContact({
        addPhonePrivacyException: contactInfo.addPhonePrivacyException,
        id: contactInfo.username ?? contactInfo.phone,
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        phone: contactInfo.phone,
      }),
    );
    console.log(contact);
    return true;
  }

  async telegramSendVerifyCode() {
    const config = this.configService.validate(
      'TelegramApiModule',
      TelegramApiConfig,
    );
    const result = await this.client.invoke(
      new Api.auth.SendCode({
        phoneNumber: '855888165154',
        apiId: config.API_ID,
        apiHash: config.API_HASH,
        settings: new Api.CodeSettings({
          allowFlashcall: true,
          currentNumber: true,
          allowAppHash: true,
          allowMissedCall: true,
          logoutTokens: [Buffer.from('arbitrary data here')],
        }),
      }),
    );
    console.log(result);
    return true;
  }

  async startTelegramClient(phone: string, phoneCode: string) {
    await this.client.start({
      phoneNumber: async () => phone,
      phoneCode: async () => phoneCode,
      onError: (err) => console.log(err),
    });
    return true;
  }
}

interface AddContact {
  addPhonePrivacyException: boolean;
  username?: string;
  firstName: string;
  lastName: string;
  phone: string;
}
