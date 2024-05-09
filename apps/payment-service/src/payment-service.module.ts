import { Module } from '@nestjs/common';
import { PaymentServiceController } from './payment-service.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [],
  controllers: [PaymentServiceController],
  providers: [PaymentService],
})
export class PaymentServiceModule {}
