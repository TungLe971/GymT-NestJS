import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forFeature([Equipment]),
    ConfigModule
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService]
})
export class EquipmentModule {}
