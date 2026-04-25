import { OrderStatus } from '../enums/orderStatus.enum';

export class CreateOrderDTO {
  userId: number;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
}
