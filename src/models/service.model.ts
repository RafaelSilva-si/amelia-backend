import { Document, Schema, model } from 'mongoose';
import { Service } from '../interfaces/service.interface';

const serviceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ServiceModel = model<Service & Document>('Service', serviceSchema);

export default ServiceModel;
