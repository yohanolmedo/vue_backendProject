import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
