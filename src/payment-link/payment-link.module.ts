import { Module } from '@nestjs/common';
import { PaymentLinkService } from './payment-link.service';
import { PaymentLinkController } from './payment-link.controller';
import { PaymentLink } from './entities/payment-link-entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PaymentLinkController],
  providers: [PaymentLinkService],
  imports: [TypeOrmModule.forFeature([PaymentLink])],
})
export class PaymentLinkModule {}
