import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';
import { HttpException } from '../errors/HttpException';
import { Service } from '../interfaces/service.interface';
import ServiceModel from '../models/service.model';

class ServiceService {
  private serviceModal = ServiceModel;

  public async findAllServices(filterParams?: any): Promise<Service[]> {
    const services = await this.serviceModal.find({ ...filterParams });
    return services;
  }

  public async findServiceById(_id: string): Promise<Service> {
    const service = await this.serviceModal.findOne({ _id });
    return service;
  }

  public async createService(serviceData: CreateServiceDto): Promise<Service> {
    const existService = await this.serviceModal.findOne({ name: serviceData.name });
    if (existService) throw new HttpException(409, `Esse nome de Serviço ${serviceData.name} já existe`);

    const createdService = await this.serviceModal.create(serviceData);
    return createdService;
  }

  public async updateService(serviceData: UpdateServiceDto): Promise<Service> {
    await this.checkService(serviceData._id);

    const updatedService = await this.serviceModal.findOneAndUpdate({ _id: serviceData._id }, serviceData, { new: true });
    return updatedService;
  }

  public async deleteService(_id: string): Promise<Service> {
    await this.checkService(_id);

    const deletedService = await this.serviceModal.findOneAndDelete({ _id });
    return deletedService;
  }

  private async checkService(_id: string): Promise<void> {
    const existService = await this.serviceModal.findOne({ _id });
    if (!existService) throw new HttpException(409, `Esse Serviço: ${_id} não existe`);
  }
}

export default ServiceService;
