import { Module } from '@nestjs/common';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
import { ConfigModule } from '@nestjs/config';
import { Staff } from 'src/staff/entities/staff.entity';
import { Card } from 'src/card/entities/card.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Classroom,Staff,Card]) ,
        ConfigModule
      ],
    controllers: [ClassroomController],
    providers: [ClassroomService]
})
export class ClassroomModule {}
