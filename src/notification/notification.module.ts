import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forFeature([Notification]) ,
    ConfigModule
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
