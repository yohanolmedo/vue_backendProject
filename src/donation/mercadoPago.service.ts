import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { PaymentData } from './dto/paymentData.dto';

@Injectable()
export class MercadoPagoService {
  constructor() {
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN,
    });
  }
  async payment(paymentData: PaymentData): Promise<any> {
    try {
      const preferences = {
        binary_mode: true,
        items: [
          {
            id: 'item-ID-1234',
            title: 'Donación',
            currency_id: 'ARS',
            picture_url:
              'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
            description: 'Donación',
            quantity: 1,
            unit_price: Number(paymentData.unit_price),
          },
        ],
        payer: {
          name: paymentData.name,
          email: paymentData.email,
        },
        back_urls: {
          success: `${process.env.MP_SUCCESS_PAYMENT}`,
          failure: `${process.env.MP_FAILURE_PAYMENT}`,
          pending: `${process.env.MP_PENDING_PAYMENT}`,
        },
        auto_return: 'approved',
        payment_methods: {
          payment_methods: {
            installments: 3,
          },
        },
        external_reference: 'Reference_1234',
      };
      const response = await mercadopago.preferences.create(preferences);
      return response.body.init_point;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
