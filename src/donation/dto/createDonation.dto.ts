import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateDonation {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  user?: string;

  @IsNotEmpty()
  @IsUUID()
  projectId: string;
}
