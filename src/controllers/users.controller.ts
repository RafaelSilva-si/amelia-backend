import { NextFunction, Response } from 'express';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { RequestWithUser, User } from '../interfaces/index.interface';

import UserService from '../services/users.service';

class UsersController {
  private usersService = new UserService();

  public findAllUsers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const filterParams: any = req.body;
      const findAllUsersData = await this.usersService.findAllUser({ ...filterParams, deletedAt: null });

      res.status(200).json({ data: findAllUsersData, message: 'OK' });
    } catch (error) {
      next(error);
    }
  };

  public findUserByEmail = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userEmail: string = req.body.email;
      const findUserData: User = await this.usersService.findUserByEmail(userEmail);

      res.status(200).json({ data: findUserData, message: 'OK' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const userReqData: User = req.user;
      const createUserData: User = await this.usersService.createUser(userData, userReqData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: UpdateUserDto = req.body;
      const userReqData: User = req.user;
      const updateUserData: User = await this.usersService.updateUser(userData, userReqData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.body._id;
      const userReqData: User = req.user;
      const deleteUserData: User = await this.usersService.deleteUser(userId, userReqData);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
