import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { FilterStaffDto } from './dto/filter-staff.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Staffs')
@Controller('staffs')
export class StaffController {
    constructor(private staffService: StaffService) {}

    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Get()
    findAll(@Query() query: FilterStaffDto): Promise<Staff[]> {
        console.log(query);
        return this.staffService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id_nv')
    findOne(@Param('id_nv') id_nv: string): Promise<Staff> {
        return this.staffService.findOne(Number(id_nv));
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createStaffDto: CreateStaffDto): Promise<Staff> {
        return this.staffService.create(createStaffDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id_nv')
    update(@Param('id_nv') id_nv: string, @Body() updateStaffDto: UpdateStaffDto) {
        return this.staffService.update(Number(id_nv), updateStaffDto);
    }

    @Delete('multiple')
    multipleDelete(@Query('id_nvs', new ParseArrayPipe({ items: String, separator: ',' })) id_nvs: string[]) {
        console.log("delete multi=> ", id_nvs)
        return this.staffService.multipleDelete(id_nvs)
    }

    @UseGuards(AuthGuard)
    @Delete(':id_nv')
    delete(@Param('id_nv') id_nv: string) {
        return this.staffService.delete(Number(id_nv));
    }
}

