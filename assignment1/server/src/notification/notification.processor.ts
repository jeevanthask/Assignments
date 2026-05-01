import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notification-queue')
export class NotificationProcessor {
  @Process('send-notification')
  async handleNotificationQueue(job: Job) {
    console.log('notification queue started');
  }
}
