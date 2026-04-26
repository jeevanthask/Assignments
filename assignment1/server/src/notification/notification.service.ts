import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async handleOrderCreatedNotification(order: any) {
    console.log(
      'Handling order created notification inside notification service',
    );
    console.log('Received order created notification:', order);
    // Here you can implement logic to send email or other types of notifications
  }
}
