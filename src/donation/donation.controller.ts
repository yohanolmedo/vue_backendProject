import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DonationService } from './donation.service';
import { CreateDonation } from './dto/createDonation.dto';
import { PaymentData } from './dto/paymentData.dto';
import { MercadoPagoService } from './mercadoPago.service';

@Controller('donation')
export class DonationController {
  constructor(
    private readonly donationService: DonationService,
    private readonly mercadoPagoService: MercadoPagoService,
  ) {}

  @Post('mp')
  async payment(@Body() body: PaymentData): Promise<any> {
    const initPoint = await this.mercadoPagoService.payment(body);
    return { initPoint };
  }

  @Post('new')
  @ApiResponse({
    status: 201,
    description: 'Donación registrada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al registrar donación',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  create(@Body() createDonation: CreateDonation) {
    return this.donationService.create(createDonation);
  }
}
