import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class KafkaConsumerService
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly kafka = new Kafka({
    clientId: 'my-nest-app',
    brokers: ['localhost:9092'],
  });
  private readonly consumer = this.kafka.consumer({ groupId: 'my-group' });

  constructor(private readonly notificationService: NotificationService) {}

  async onModuleInit() {
    await this.consumer.connect();
    console.log('Kafka consumer connected');
    await this.consumer.subscribe({
      topic: 'orders.created',
      fromBeginning: false,
    });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const payload = message.value ? message.value.toString() : null;
          console.log(
            `[${topic}]: Partition: ${partition} - Message: ${payload}`,
          );

          if (topic === 'orders.created') {
            await this.notificationService.handleOrderCreatedNotification(
              JSON.parse(payload!),
            );
          }
        } catch (error) {
          console.log('error occured');
          throw error;
        }
      },
    });
  }

  async onApplicationShutdown() {
    await this.consumer.disconnect();
    console.log('Kafka consumer disconnected');
  }
}
