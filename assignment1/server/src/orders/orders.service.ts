import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { KafkaProducerService } from '../kafka/kafka-producer/kafka-producer.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async createOrder(order: CreateOrderDTO): Promise<CreateOrderDTO> {
    await this.kafkaProducer.sendMessage(
      'orders.created',
      JSON.stringify(order),
    );
    return await this.orderRepository.save(order);
  }
}
