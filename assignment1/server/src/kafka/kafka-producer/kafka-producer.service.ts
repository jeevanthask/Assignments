import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly kafka = new Kafka({
    clientId: 'my-nest-app',
    brokers: ['localhost:9092'],
  });

  private producer: Producer;

  async onModuleInit() {
    this.producer = this.kafka.producer({
      idempotent: true,
      maxInFlightRequests: 5,
      transactionTimeout: 30000,
    });
    console.log('Kafka producer connected');
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
    console.log('Kafka producer disconnected');
  }

  async sendMessage(topic: string, message: string): Promise<any> {
    try {
      return await this.producer.send({
        topic,
        messages: [{ value: message }],
        acks: 1,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async sendToRetry(params: {
    retryTopic: string;
    originalTopic: string;
    key: any;
    value: any;
    headers: any;
    attempt: number;
    delayMs: number;
    error: Error;
  }): Promise<any> {
    try {
      return await this.producer.send({
        topic: params.retryTopic,
        messages: [
          {
            key: params.key,
            value: params.value,
            headers: {
              ...params.headers,
            },
          },
        ],
        acks: 1,
      });
    } catch (error) {}
  }
}
