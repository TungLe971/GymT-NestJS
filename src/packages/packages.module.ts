import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packages } from './entities/packages.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[
        TypeOrmModule.forFeature([Packages]) ,
        ConfigModule
      ],
    controllers: [PackagesController],
    providers: [PackagesService]
})
export class PackagesModule {}
