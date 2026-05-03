import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from '../enums/orderStatus.enum';

@Entity('outboxpoller')
export class OutboxPoller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'aggregate_type' })
  aggregateType: string;

  @Column({ name: 'aggregate_id' })
  aggregateId: string;

  @Column({ name: 'event_type' })
  eventType: string;

  @Column()
  payLoad: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.pending })
  status: string;

  @Column()
  attempts: number;

  @Column({ name: 'last_error' })
  lastError: string;

  @Column({ type: 'timestamp', name: 'next_attempt_at' })
  nextAttemptAt: Date;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'published_at', type: 'timestamp' })
  publishedAt: Date;
}
