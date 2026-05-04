import { Module } from '@nestjs/common';
import { OutboxPollerController } from './outbox-poller.controller';
import { OutboxPollerService } from './outbox-poller.service';
import { OutboxPoller } from './entities/outbox.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [TypeOrmModule.forFeature([OutboxPoller]), KafkaModule],
  controllers: [OutboxPollerController],
  providers: [OutboxPollerService],
  exports: [OutboxPollerService],
})
export class OutboxPollerModule {}
