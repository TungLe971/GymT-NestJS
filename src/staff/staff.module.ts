import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Staff]) 
  ],
  controllers: [StaffController],
  providers: [StaffService]
})
export class StaffModule {}
