import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';

export const set_roles = 'roles';

export const RoleProtected = (...args: ValidRoles[]) => {
  return SetMetadata(set_roles, args);
};
