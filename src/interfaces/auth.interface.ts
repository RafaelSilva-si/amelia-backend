import { Request } from 'express';
import { User } from '../interfaces/index.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  accessToken: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
