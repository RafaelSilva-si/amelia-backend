export interface User {
  _id: string;
  subscriberId: string;
  name: string;
  email: string;
  password: string;
  CPF?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  phone?: string;
  photo?: string;
  serviceAgentId?: string;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
