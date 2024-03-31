import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { Equipment } from './entities/equipment.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { FilterEquipmentDto } from './dto/filter-equipment.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Equipments')
@Controller('equipments')
export class EquipmentController {
    constructor(private equipmentService: EquipmentService) {}

    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Get()
    findAll(@Query() query: FilterEquipmentDto): Promise<Equipment[]> {
        console.log(query);
        return this.equipmentService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id_equipment')
    findOne(@Param('id_equipment') id_equipment: string): Promise<Equipment> {
        return this.equipmentService.findOne(Number(id_equipment));
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
        return this.equipmentService.create(createEquipmentDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id_equipment')
    update(@Param('id_equipment') id_equipment: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
        return this.equipmentService.update(Number(id_equipment), updateEquipmentDto);
    }

    @Delete('multiple')
    multipleDelete(@Query('id_equipments', new ParseArrayPipe({ items: String, separator: ',' })) id_equipments: string[]) {
        console.log("delete multi=> ", id_equipments)
        return this.equipmentService.multipleDelete(id_equipments)
    }

    @UseGuards(AuthGuard)
    @Delete(':id_equipment')
    delete(@Param('id_equipment') id_equipment: string) {
        return this.equipmentService.delete(Number(id_equipment));
    }
}

