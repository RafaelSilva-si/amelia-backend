import { Router } from 'express';

import AuthController from '../controllers/auth.controller';
import { Routes } from '../interfaces/index.interface';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, this.authController.signUp);
    this.router.post(`${this.path}login`, this.authController.logIn);
    this.router.get(`${this.path}check-auth`, this.authController.checkAuth);
    this.router.get(`${this.path}verify/:token`, this.authController.activate);
  }
}

export default AuthRoute;
