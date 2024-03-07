import { Document, Schema, model } from 'mongoose';
import { Subscriber } from '../interfaces/index.interface';

const subscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  plan: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },
  active: {
    type: Boolean,
    required: false,
  },
});

const SubscriberModel = model<Subscriber & Document>('Subscriber', subscriberSchema);

export default SubscriberModel;
