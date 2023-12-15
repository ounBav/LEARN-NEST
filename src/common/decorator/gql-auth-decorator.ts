import { SetMetadata } from '@nestjs/common';

export const Auth = (...roles: ('SUPER_ADMIN' | 'ADMIN' | 'USER')[]) =>
  SetMetadata('roles', roles);
