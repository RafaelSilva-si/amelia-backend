import { Router } from 'express';

import { Routes } from '../interfaces/index.interface';
import { CreateUserDto } from '../dtos/users.dto';

import validationMiddleware from '../middlewares/validation.middleware';
import AuthController from '../controllers/auth.controller';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, this.authController.logIn);
    this.router.get(`${this.path}check-auth`, this.authController.checkAuth);
    this.router.get(`${this.path}verify/:token`, this.authController.activate);
  }
}

export default AuthRoute;
