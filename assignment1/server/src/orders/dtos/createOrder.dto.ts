import { IsEnum, IsInt, IsString } from 'class-validator';
import { OrderStatus } from '../enums/orderStatus.enum';

export class CreateOrderDTO {
  @IsInt()
  userId: number;

  @IsString()
  productNamee: string;

  @IsInt()
  quantity: number;

  @IsInt()
  totalAmount: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
