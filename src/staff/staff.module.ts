import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:[
    TypeOrmModule.forFeature([Staff]),
    ConfigModule 
  ],
  controllers: [StaffController],
  providers: [StaffService]
})
export class StaffModule {}
