import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/createOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post('createOrder')
  async createOrder(
    @Body() createOrderDto: CreateOrderDTO,
  ): Promise<CreateOrderDTO> {
    return await this.orderService.createOrder(createOrderDto);
  }
}
