import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxPoller } from './entities/outbox.entity';
import { EntityManager, Repository } from 'typeorm';
import { Cron, Interval } from '@nestjs/schedule';
import { KafkaConsumerService } from 'src/kafka/kafka-consumer/kafka-consumer.service';
import { KafkaProducerService } from 'src/kafka/kafka-producer/kafka-producer.service';

@Injectable()
export class OutboxPollerService {
  constructor(
    @InjectRepository(OutboxPoller)
    private outboxRepository: Repository<OutboxPoller>,
    private kafkaProducerService: KafkaProducerService,
  ) {}

  async createOutBox(
    createOutBoxDTO: any,
    manager: EntityManager,
  ): Promise<any> {
    // return this.outboxRepository.save(createOutBoxDTO);

    const repo = manager
      ? manager.getRepository(OutboxPoller)
      : this.outboxRepository;

    return repo.save(createOutBoxDTO);
  }

  @Interval(10000)
  async handleOutboxEvent(): Promise<any> {
    let kafkaResponse: any;

    console.log('cron job for outbox service started-------------');
    const pendingOutboxes = await this.outboxRepository.find({
      where: { status: 'PENDING' },
    });

    console.log('pending outboxes------------------');
    console.log(pendingOutboxes);

    if (pendingOutboxes.length) {
      kafkaResponse = await this.kafkaProducerService.sendMessage(
        'orders.created',
        JSON.stringify(pendingOutboxes[0]),
      );

      console.log('kafka response---------------------------');
      console.log(kafkaResponse);
    }

    if (kafkaResponse) {
      const updateStatus = await this.outboxRepository
        .createQueryBuilder()
        .update(OutboxPoller)
        .set({ status: 'CONFIRMED' })
        .where('status = :status', { status: 'PENDING' })
        .execute();

      console.log('status updated-----------');
      console.log(updateStatus);
    }

    console.log('end of kafka response--------------------');
  }
}
