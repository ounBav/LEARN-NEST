/* eslint-disable prettier/prettier */
import { registerEnumType } from "@nestjs/graphql";
export enum UserRole {
  ADMIN = 'Admin',
  PARTNER = 'partner',
  LOCAL_BRAND = 'local_bran',
  STUFF = 'stuff',
  GUEST = 'guest',
}


export enum EntityStatus {
    ACTIVE = 'active',
    IN_ACTIVE = 'in_active',
    DELETE = 'delete',
}

registerEnumType(EntityStatus, { name: 'EntityStatus' });
registerEnumType(UserRole, { name: 'UserRole' });