import { NextFunction, Response } from 'express';

import { RequestWithUser } from '../interfaces/auth.interface';
import ServiceService from '../services/service.service';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';

class ServiceController {
  private serviceService = new ServiceService();

  public findAllServices = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const filterParams: any = req.body;
      const servicesData = await this.serviceService.findAllServices({ ...filterParams, deletedAt: null });

      res.status(200).json({ data: servicesData, message: 'OK' });
    } catch (error) {
      next(error);
    }
  };

  public findServiceById = async (req: any, res: any, next: any) => {
    try {
      const serviceId = req.body.id;
      const serviceData = await this.serviceService.findServiceById(serviceId);

      res.status(200).json({ data: serviceData, message: 'OK' });
    } catch (error) {
      next(error);
    }
  };

  public createService = async (req: any, res: any, next: any) => {
    try {
      const serviceBody: CreateServiceDto = req.body;
      const serviceData = await this.serviceService.createService(serviceBody);

      res.status(201).json({ data: serviceData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateService = async (req: any, res: any, next: any) => {
    try {
      const serviceBody: UpdateServiceDto = req.body;
      const serviceData = await this.serviceService.updateService(serviceBody);

      res.status(200).json({ data: serviceData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteService = async (req: any, res: any, next: any) => {
    try {
      const serviceId = req.body.id;
      const serviceData = await this.serviceService.deleteService(serviceId);

      res.status(200).json({ data: serviceData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ServiceController;
