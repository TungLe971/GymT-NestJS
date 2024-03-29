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
// import { StaffModule } from './staff/staff.module';
// import { CardModule } from './card/card.module';
// import { EventModule } from './event/event.module';
// import { WardrobeModule } from './wardrobe/wardrobe.module';
// import { SalaryModule } from './salary/salary.module';
// import { FoodModule } from './food/food.module';
// import { EquipmentModule } from './equipment/equipment.module';
// import { GiftModule } from './gift/gift.module';
// import { ScheduleController } from './schedule/schedule.controller';
// import { ScheduleModule } from './schedule/schedule.module';
// import { NotificationModule } from './notification/notification.module';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    PostModule,
    CategoryModule,
    MemberModule,
    // StaffModule,
    // CardModule,
    // EventModule,
    // WardrobeModule,
    // SalaryModule,
    // FoodModule,
    // EquipmentModule,
    // GiftModule,
    // ScheduleModule,
    // NotificationModule,
    PackagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
