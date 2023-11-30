/* eslint-disable prettier/prettier */
import * as admin from 'firebase-admin';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { FIREBASE_ADMIN_INJECT_TOKEN } from './firebase-admin-constand'; 


export const FirebaseAdminProvider = {

    provide:FIREBASE_ADMIN_INJECT_TOKEN,
    useFactory: () => {
    const path = resolve('.', process.env.FIREBASE_CREDENTIAL_PATH);
    if (!existsSync(path)) {
    throw new Error(`Unknown file ${path}`);
    }
    return admin.initializeApp({
        credential: admin.credential.cert(path),
    });
    },
}
