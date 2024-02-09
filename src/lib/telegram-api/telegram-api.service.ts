import { BadRequestException } from '@nestjs/common';
import { randBetween } from 'big-integer';
import { Api, TelegramClient } from 'telegram';

export class TelegramApiService {
  constructor(private readonly client: TelegramClient) {}
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
    await this.client.sendMessage(userName, { message: mess });
    return true;
  }
}
