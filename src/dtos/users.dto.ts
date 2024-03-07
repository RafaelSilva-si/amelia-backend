import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O campo E-mail é obrigatório' })
  @IsEmail({}, { message: 'O endereço de e-mail deve ser válido' })
  email: string;

  @IsNotEmpty({ message: 'O campo Senha é obrigatório' })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;

  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  @IsString({ message: 'o CPF deve ser uma string' })
  cpf: string;

  @IsString({ message: 'O endereço deve ser uma string' })
  address: string;

  @IsString({ message: 'A Cidade deve ser uma string' })
  city: string;

  @IsString({ message: 'O Estado deve ser uma string' })
  state: string;

  @IsString({ message: 'O País deve ser uma string' })
  country: string;

  @IsString({ message: 'O CEP deve ser uma string' })
  zipcode: string;

  @IsString({ message: 'O Telefone deve ser uma string' })
  phone: string;

  @IsString({ message: 'A Foto deve ser uma string' })
  photo: string;
}

export class UpdateUserDto extends CreateUserDto {
  @IsString({ message: 'O ID deve ser uma string' })
  @IsNotEmpty({ message: 'O campo ID é obrigatório' })
  _id: string;
}
