import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumerService
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly kafka = new Kafka({
    clientId: 'my-nest-app',
    brokers: ['localhost:9092'],
  });
  private readonly consumer = this.kafka.consumer({ groupId: 'my-group' });

  async onModuleInit() {
    await this.consumer.connect();
    console.log('Kafka consumer connected');
    await this.consumer.subscribe({
      topic: 'orders.created',
      fromBeginning: true,
    });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const payload = message.value ? message.value.toString() : null;
        console.log(
          `[${topic}]: Partition: ${partition} - Message: ${payload}`,
        );

        // Add your business logic here to process the message
      },
    });
  }

  async onApplicationShutdown() {
    await this.consumer.disconnect();
    console.log('Kafka consumer disconnected');
  }
}
