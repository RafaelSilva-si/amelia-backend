import { Router } from 'express';

import { validationMiddleware, authMiddleware } from '../middlewares/index.middleware';
import { Routes } from '../interfaces/index.interface';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

import UsersController from '../controllers/users.controller';

class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public userController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/filter`, authMiddleware, this.userController.findAllUsers);
    this.router.post(`${this.path}/find-by-email`, authMiddleware, this.userController.findUserByEmail);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateUserDto, 'body'), this.userController.createUser);
    this.router.patch(`${this.path}`, authMiddleware, validationMiddleware(UpdateUserDto, 'body'), this.userController.updateUser);
    this.router.delete(`${this.path}`, authMiddleware, this.userController.deleteUser);
  }
}

export default UserRoute;
