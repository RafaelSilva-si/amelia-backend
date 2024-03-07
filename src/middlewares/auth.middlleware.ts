import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { SECRET_KEY, setGlobalSubscriberId } from '../config';
import { HttpException } from '../errors/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/index.interface';
import UserModel from '../models/user.model';

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    console.log(req.cookies['Authorization']);

    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await UserModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        setGlobalSubscriberId(findUser.subscriberId);

        next();
      } else {
        next(new HttpException(401, 'Login Invalido'));
      }
    } else {
      next(new HttpException(404, 'Login não encontrado'));
    }
  } catch (error) {
    next(new HttpException(401, 'Login Invalido'));
  }
};

export default authMiddleware;
