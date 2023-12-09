/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';

import { FIREBASE_ADMIN_INJECT_TOKEN } from './firebase-admin-constand';

export const InjectFirebaseAdmin = () => Inject(FIREBASE_ADMIN_INJECT_TOKEN);
