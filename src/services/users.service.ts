import { hash } from 'bcrypt';

import { HttpException } from '../errors/HttpException';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { BASE_URL, PORT } from '../config';
import { createToken } from '../utils/CreateToken';
import { User } from '../interfaces/index.interface';

import UserModel from '../models/user.model';
import SubscriberModel from '../models/subscriber.model';
import EmailService from './email.service';

class UserService {
  private usersModal = UserModel;
  private subscriberModel = SubscriberModel;

  private emailService = new EmailService();
  public async findAllUser(filterParams?: any): Promise<User[]> {
    const usersData = await this.usersModal.find({ ...filterParams });

    return usersData;
  }

  public async findUserByEmail(email: string): Promise<User> {
    const userData = await this.usersModal.findOne({ email });

    return userData;
  }

  public async createUser(userData: CreateUserDto, user: User): Promise<User> {
    const existUser: User = await this.usersModal.findOne({ email: userData.email });
    if (existUser) throw new HttpException(409, `Esse email ${userData.email} já existe`);

    // Cria Inscrito
    const subscriberData = {
      name: userData.name,
      email: userData.email,
    };
    const subscriber = await this.subscriberModel.create(subscriberData);

    // Cria Usuário
    const hashedPassword = await hash(userData.password, 10);
    const createdUser = await this.usersModal.create({
      ...userData,
      subscriberId: subscriber._id,
      password: hashedPassword,
      createdAt: new Date(),
      createdBy: user._id,
    });

    // Envia Email de confirmação
    const tokenData = createToken(createdUser);
    await this.emailService.sendEmail(createdUser.email, 'Confirmar email', 'email-confirmation', {
      createdUser,
      confirmationLink: `${BASE_URL}:${PORT}/verify/${tokenData.accessToken}`,
    });

    return createdUser;
  }

  public async updateUser(userData: UpdateUserDto, user: User): Promise<User> {
    await this.checkUser(userData._id);

    const updatedUser = await this.usersModal.findOneAndUpdate(
      { _id: userData._id },
      { ...userData, updatedAt: new Date(), updatedBy: user._id },
      { new: true },
    );

    return updatedUser;
  }

  public async deleteUser(_id: string, user: User): Promise<User> {
    await this.checkUser(_id);

    const deletedUser = await this.usersModal.findOneAndUpdate({ _id, deletedAt: new Date(), deletedBy: user._id });

    return deletedUser;
  }

  private async checkUser(_id: string): Promise<void> {
    const existTag = await this.usersModal.findOne({ _id });
    if (!existTag) throw new HttpException(409, `Esse usuário: ${_id} não existe`);
  }
}

export default UserService;
