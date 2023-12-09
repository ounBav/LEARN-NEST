/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { NotificationInput } from './notification.input';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { FirebaseAdminService } from 'src/api/shared/firebase-admin.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly firebase: FirebaseAdminService,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepo: Repository<NotificationEntity>,
  ) {}

  async sentNotification(input: NotificationInput) {
    this.notificationRepo.save({ ...input });
    return this.firebase.sendNotification(input);
  }
}
