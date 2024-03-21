import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { MemberModule } from './member/member.module';
import { StaffModule } from './staff/staff.module';
import { CardModule } from './card/card.module';
import { EventService } from './event/event.service';
import { EventController } from './event/event.controller';
import { EventModule } from './event/event.module';
import { WardrobeModule } from './wardrobe/wardrobe.module';
import { SalaryService } from './salary/salary.service';
import { SalaryController } from './salary/salary.controller';
import { SalaryModule } from './salary/salary.module';
import { FoodModule } from './food/food.module';
import { EquipmentService } from './equipment/equipment.service';
import { EquipmentController } from './equipment/equipment.controller';
import { EquipmentModule } from './equipment/equipment.module';
import { GiftModule } from './gift/gift.module';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleController } from './schedule/schedule.controller';
import { ScheduleModule } from './schedule/schedule.module';
import { NotificationModule } from './notification/notification.module';
import { PackagesService } from './packages/packages.service';
import { PackagesController } from './packages/packages.controller';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    PostModule,
    CategoryModule,
    MemberModule,
    StaffModule,
    CardModule,
    EventModule,
    WardrobeModule,
    SalaryModule,
    FoodModule,
    EquipmentModule,
    GiftModule,
    ScheduleModule,
    NotificationModule,
    PackagesModule
  ],
  controllers: [AppController, EventController, SalaryController, EquipmentController, ScheduleController, PackagesController],
  providers: [AppService, EventService, SalaryService, EquipmentService, ScheduleService, PackagesService],
})
export class AppModule { }
