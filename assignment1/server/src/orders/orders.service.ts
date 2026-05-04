import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { KafkaProducerService } from '../kafka/kafka-producer/kafka-producer.service';
import { OutboxPollerService } from 'src/outbox-poller/outbox-poller.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly kafkaProducer: KafkaProducerService,
    private outboxService: OutboxPollerService,
  ) {}

  async createOrder(order: CreateOrderDTO): Promise<CreateOrderDTO> {
    // await this.kafkaProducer.sendMessage(
    //   'orders.created',
    //   JSON.stringify(order),
    // );

    return this.dataSource.transaction(async (manager) => {
      const orderCreated = await manager.getRepository(Order).save(order);
      console.log(
        'order created-----------------------------------------------',
      );
      console.log(orderCreated);

      const sampleOutBox = {
        aggregateType: 'order',
        aggregateId: '23',
        eventType: 'order.created',
        payLoad: 'payload1',
        status: 'pending',
        attempts: 2,
        lastError: 'lasterror1',
        nextAttemptAt: '2024-05-20T14:30:00.000Z',
        publishedAt: '2024-05-20T14:30:00.000Z',
      };

      const outboxCreated = await this.outboxService.createOutBox(
        sampleOutBox,
        manager,
      );
      console.log('outbox created-----------------------------------------');
      console.log(outboxCreated);

      return orderCreated;
    });
  }
}
