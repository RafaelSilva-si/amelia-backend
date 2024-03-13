import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;

  @IsNotEmpty({ message: 'Price is required.' })
  price: number;
}

export class UpdateServiceDto extends CreateServiceDto {
  @IsNotEmpty({ message: 'Id is required.' })
  @IsString({ message: 'Id must be a string.' })
  _id: string;
}
