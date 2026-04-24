import { Body, Controller, Post } from '@nestjs/common';

class CreateOrderDTO {
  userId: number;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

@Controller('orders')
export class OrdersController {
  @Post('createOrder')
  async createOrder(
    @Body() createOrderDto: CreateOrderDTO,
  ): Promise<CreateOrderDTO> {
    return createOrderDto;
  }
}
