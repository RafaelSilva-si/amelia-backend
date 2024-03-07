import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { User } from '../interfaces/user.interface';
import { TokenData } from '../interfaces/auth.interface';

export const createToken = (user: Partial<User>): TokenData => {
  const accessTokenData = { _id: user._id };

  const accessToken = sign(accessTokenData, SECRET_KEY, { expiresIn: '1d' });

  return { accessToken, expiresIn: 86400 };
};

export const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.accessToken}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};
