import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxPoller } from './entities/outbox.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OutboxPollerService {
  constructor(
    @InjectRepository(OutboxPoller)
    private outboxRepository: Repository<OutboxPoller>,
  ) {}

  async createOutBox(createOutBoxDTO: any): Promise<any> {
    return this.outboxRepository.save(createOutBoxDTO);
  }
}
