import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import UsersController from "../controllers/users.controller";

class UserRoute implements Routes {
  public path = "/users";
  public router = Router();
  public userController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.userController.findAllUsers);
  }
}

export default UserRoute;
