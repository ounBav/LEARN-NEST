/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectFirebaseAdmin } from 'src/lib/firebase/firebase-admin-decorater';
import * as admin from 'firebase-admin'
import { FirebaseUserId, NotificationInput } from 'src/graphql/messages/notification.input';




@Injectable()
export class FirebaseAdminService {
    constructor(@InjectFirebaseAdmin() private readonly firebaseAdmin : admin.app.App){}
    async sendNotification(input:NotificationInput): Promise<boolean> {
        const message = {
          notification: {
            title: input.title,
            body: input.body
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

    async getDeviceToken({ userId }: FirebaseUserId): Promise<string | null> {
      try {
        // Assume you have a Firestore collection storing the device tokens for each user
        const userSnapshot = await admin.firestore().collection('users').doc(userId).get();
        
        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          return userData.deviceToken || null;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error getting device token:', error);
        return null;
      }
    }
}
