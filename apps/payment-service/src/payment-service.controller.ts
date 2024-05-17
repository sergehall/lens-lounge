import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('api/payment-service')
export class PaymentServiceController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }
}
