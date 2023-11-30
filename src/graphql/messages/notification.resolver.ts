/* eslint-disable prettier/prettier */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { NotificationInput } from './notification.input';
// import { FirebaseUserId, NotificationInput } from './notification.input';

@Resolver()
export class NotificationResolver {
    constructor (private readonly service: NotificationService){}
    @Mutation(() => Boolean)
    sendNotification(@Args('input') input: NotificationInput): Promise<boolean>{
        return this.service.sentNotification(input)
    }
}

