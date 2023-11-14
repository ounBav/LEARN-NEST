import { registerEnumType } from "@nestjs/graphql";

/* eslint-disable prettier/prettier */
export enum UserRole {
  ADMIN = 'Admin',
  PARTNER = 'partner',
  LOCAL_BRAND = 'local_bran',
  STUFF = 'stuff',
  GUEST = 'guest',
}


export enum UserStatus {
    ACTIVE = 'active',
    IN_ACTIVE = 'in_active',
}

registerEnumType(UserStatus, { name: 'UserStatus' });
registerEnumType(UserRole, { name: 'UserRole' });