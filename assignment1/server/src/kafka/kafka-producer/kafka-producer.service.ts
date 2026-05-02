import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaProducerService
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly kafka = new Kafka({
    clientId: 'my-nest-app',
    brokers: ['localhost:9092'],
  });

  private readonly producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
    console.log('Kafka producer connected');
  }
  async onApplicationShutdown() {
    await this.producer.disconnect();
    console.log('Kafka producer disconnected');
  }

  async sendMessage(topic: string, message: string): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      console.log(`Message sent to topic ${topic}: ${message}`);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}
