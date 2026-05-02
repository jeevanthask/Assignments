import { IsEnum, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';
import { OrderStatus } from '../enums/orderStatus.enum';

export class CreateOrderDTO {
  @IsInt()
  userId: number;

  @IsString()
  productName: string;

  @IsInt()
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  totalAmount: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
