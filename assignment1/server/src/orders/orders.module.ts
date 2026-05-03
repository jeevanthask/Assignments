import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { KafkaModule } from 'src/kafka/kafka.module';
import { OutboxPollerModule } from 'src/outbox-poller/outbox-poller.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), KafkaModule, OutboxPollerModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
