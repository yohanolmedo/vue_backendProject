import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { Donation } from './entities/donation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercadoPagoService } from './mercadoPago.service';
import { Project } from 'src/project/entities/project.entity';

@Module({
  controllers: [DonationController],
  providers: [DonationService, MercadoPagoService],
  imports: [TypeOrmModule.forFeature([Donation, Project])],
})
export class DonationModule {}
