import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('send-notification')
  async createOrder(@Body() dsd: any): Promise<any> {
    return await this.notificationService.handleOrderCreatedNotification(dsd);
  }
}
