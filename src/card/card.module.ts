import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Packages } from 'src/packages/entities/packages.entity';
import { ConfigModule } from '@nestjs/config';
import { Card } from './entities/card.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([Card, Member, Staff, Packages, Classroom]),
    ConfigModule

  ],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule {}
