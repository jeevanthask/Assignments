import { Module } from '@nestjs/common';
import { OutboxPollerController } from './outbox-poller.controller';
import { OutboxPollerService } from './outbox-poller.service';
import { OutboxPoller } from './entities/outbox.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OutboxPoller])],
  controllers: [OutboxPollerController],
  providers: [OutboxPollerService],
  exports: [OutboxPollerService],
})
export class OutboxPollerModule {}
