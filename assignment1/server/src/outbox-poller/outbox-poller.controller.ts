import { Controller, Post, Body } from '@nestjs/common';
import { OutboxPollerService } from './outbox-poller.service';

@Controller('outbox-poller')
export class OutboxPollerController {
  constructor(private outboxService: OutboxPollerService) {}

  @Post('create-outbox')
  async createOutBox(@Body() createOutBoxDTO: any): Promise<any> {
    return this.outboxService.createOutBox(createOutBoxDTO);
  }
}
