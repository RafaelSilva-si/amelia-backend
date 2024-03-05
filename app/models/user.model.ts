import { Document, Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema: Schema = new Schema({
  subscriberId: {
    type: Schema.Types.ObjectId,
    ref: "Subscriber",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cpf: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  phone: {
    type: String,
  },
  photo: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
  },
  serviceAgentId: {
    type: Schema.Types.ObjectId,
    ref: "ServiceAgent",
  },
  createdAt: {
    type: Date,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  deletedAt: {
    type: Date,
  },
  deletedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const UserModel = model<User & Document>("User", userSchema);

export default UserModel;
