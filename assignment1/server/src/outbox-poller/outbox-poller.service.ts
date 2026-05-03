import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxPoller } from './entities/outbox.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class OutboxPollerService {
  constructor(
    @InjectRepository(OutboxPoller)
    private outboxRepository: Repository<OutboxPoller>,
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
}
