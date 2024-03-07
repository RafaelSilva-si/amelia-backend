import { NextFunction, Request, Response } from 'express';

import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/index.interface';

import AuthService from '../services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { user, accessToken, cookie } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ user, accessToken });
    } catch (error) {
      next(error);
    }
  };

  public activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activateUserData: User = await this.authService.activateUser(req.params.token);
      res.status(200).json({ data: activateUserData, message: 'Account activation' });
    } catch (error) {
      next(error);
    }
  };

  public checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
      const user: User = await this.authService.checkAuth(token);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
