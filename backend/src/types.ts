import { Request as ExpressRequest } from 'express';

export interface RequestUser extends  ExpressRequest{
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };
  }