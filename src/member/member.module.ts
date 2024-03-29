import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:[
    TypeOrmModule.forFeature([Member]),
    ConfigModule
  ],
  controllers: [MemberController],
  providers: [MemberService]
})
export class MemberModule {}
