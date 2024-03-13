import { Router } from 'express';

import { validationMiddleware, authMiddleware } from '../middlewares/index.middleware';
import { Routes } from '../interfaces/index.interface';

import ServiceController from '../controllers/service.controller';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';

class ServiceRoute implements Routes {
  public path = '/services';
  public router = Router();
  public serviceController = new ServiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/filter`, authMiddleware, this.serviceController.findAllServices);
    this.router.post(`${this.path}/find-by-id`, authMiddleware, this.serviceController.findServiceById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateServiceDto, 'body'), this.serviceController.createService);
    this.router.patch(`${this.path}`, authMiddleware, validationMiddleware(UpdateServiceDto, 'body'), this.serviceController.updateService);
    this.router.delete(`${this.path}`, authMiddleware, this.serviceController.deleteService);
  }
}

export default ServiceRoute;
