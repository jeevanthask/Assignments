import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue('notification-queue')
    private readonly notificationQueue: Queue,
  ) {}

  async handleOrderCreatedNotification(order: any) {
    console.log(
      'Handling order created notification inside notification service',
    );
    console.log('Received order created notification:', order);
    // Here you can implement logic to send email or other types of notifications

    await this.notificationQueue.add('send-notification', {
      orderId: order.id,
      message: `Bull ADDED with ID: ${order.id}`,
    });
  }
}
