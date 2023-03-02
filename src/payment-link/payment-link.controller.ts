import { Controller } from '@nestjs/common';
import { PaymentLinkService } from './payment-link.service';

@Controller('payment-link')
export class PaymentLinkController {
  constructor(private readonly paymentLinkService: PaymentLinkService) {}
}
