import { Request as ExpressRequest } from 'express';

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export interface RequestUser extends ExpressRequest {
  user: {
    sub: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}
