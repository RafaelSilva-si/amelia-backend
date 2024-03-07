import { hash, compare } from 'bcrypt';
import { verify } from 'jsonwebtoken';

import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/index.interface';
import { HttpException } from '../errors/HttpException';
import { BASE_URL, PORT, SECRET_KEY, setGlobalSubscriberId } from '../config';
import { createCookie, createToken } from '../utils/CreateToken';

import SubscriberModel from '../models/subscriber.model';
import UserModel from '../models/user.model';
import EmailService from './email.service';

class AuthService {
  private users = UserModel;
  private subscriberModel = SubscriberModel;

  private emailService = new EmailService();

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `Esse email ${userData.email} já existe`);

    // Cria Inscrito
    const subscriberData = {
      name: userData.name,
      email: userData.email,
    };
    const subscriber = await this.subscriberModel.create(subscriberData);

    // Cria Usuário
    const hashedPassword = await hash(userData.password, 10);
    const createdUser = await this.users.create({
      ...userData,
      subscriberId: subscriber._id,
      password: hashedPassword,
      createdAt: new Date(),
      updated_at: new Date(),
    });

    // Envia Email de confirmação
    const tokenData = createToken(createdUser);
    await this.emailService.sendEmail(createdUser.email, 'Confirmar email', 'email-confirmation', {
      createdUser,
      confirmationLink: `${BASE_URL}:${PORT}/verify/${tokenData.accessToken}`,
    });

    return createdUser;
  }

  public async activateUser(token: string): Promise<User> {
    let decodedToken;
    try {
      decodedToken = verify(token, SECRET_KEY);
    } catch (error) {
      throw new HttpException(409, `Esse Token é inválido`);
    }

    const { _id } = decodedToken;

    const findUser: User = await this.users.findByIdAndUpdate(_id, { emailVerified: true, updated_at: new Date() }, { new: true });

    return findUser;
  }

  public async login(userData: CreateUserDto): Promise<{ user: User; accessToken: string; cookie: string }> {
    const user: User = await this.users.findOne({ email: userData.email });
    if (!user) throw new HttpException(409, `Esse email ${userData.email} Não existe`);

    setGlobalSubscriberId(user.subscriberId);

    const isPasswordMatching: boolean = await compare(userData.password, user.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Senha ou email inválido');

    const tokenData = createToken(user);
    const createCookieData = createCookie(tokenData);

    return { user, accessToken: tokenData.accessToken, cookie: createCookieData };
  }

  public async checkAuth(token: string): Promise<User> {
    const decodedToken: any = verify(token, SECRET_KEY);
    const { _id } = decodedToken;

    const user: User = await this.users.findById(_id);
    setGlobalSubscriberId(user.subscriberId);

    return user;
  }
}

export default AuthService;
