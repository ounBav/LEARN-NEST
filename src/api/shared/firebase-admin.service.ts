import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectFirebaseAdmin } from 'src/lib/firebase/firebase-admin-decorater';
import * as admin from 'firebase-admin';
import { NotificationInput } from 'src/graphql/messages/notification.input';

@Injectable()
export class FirebaseAdminService {
  private readonly database: admin.database.Database;
  constructor(
    @InjectFirebaseAdmin()
    private readonly firebaseAdmin: admin.app.App,
  ) {
    this.database = admin.database();
  }

  async sendNotification(input: NotificationInput): Promise<boolean> {
    const message = {
      notification: {
        title: input.title,
        body: input.body,
      },
      token: input.to,
    };

    try {
      await this.firebaseAdmin.messaging().send(message);
      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  async sendOTP(phone: string) {
    console.log(phone);
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);

    return true;
  }

  async writeChatData(message: any) {
    if (typeof message === 'object' && message !== null) {
      const chatRef = this.database.ref('chats');
      await chatRef.child(message.id).set(JSON.stringify(message));
    } else {
      throw new BadRequestException('null message');
    }
  }
}
