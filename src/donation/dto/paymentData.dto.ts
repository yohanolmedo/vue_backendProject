import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentData {
  @IsNotEmpty()
  @IsNumber()
  unit_price: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
