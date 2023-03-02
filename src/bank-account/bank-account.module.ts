import { Module } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { BankAccount } from './entities/bank-account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BankAccountController],
  providers: [BankAccountService],
  imports: [TypeOrmModule.forFeature([BankAccount])],
})
export class BankAccountModule {}
