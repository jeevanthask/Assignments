import { Module } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer/kafka-producer.service';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [KafkaProducerService, KafkaConsumerService],
  controllers: [],
  exports: [KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule {}
