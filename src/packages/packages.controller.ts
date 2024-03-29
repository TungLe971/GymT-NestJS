import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { Packages } from './entities/packages.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePackagesDto } from './dto/create-packages.dto';
import { UpdatePackagesDto } from './dto/update-packages.dto';
import { FilterPackagesDto } from './dto/filter-packages.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Packagess')
@Controller('packagess')
export class PackagesController {
    constructor(private packagesService: PackagesService) {}

    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Get()
    findAll(@Query() query: FilterPackagesDto): Promise<Packages[]> {
        console.log(query);
        return this.packagesService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id_packages')
    findOne(@Param('id_packages') id_packages: string): Promise<Packages> {
        return this.packagesService.findOne(Number(id_packages));
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createPackagesDto: CreatePackagesDto): Promise<Packages> {
        return this.packagesService.create(createPackagesDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id_packages')
    update(@Param('id_packages') id_packages: string, @Body() updatePackagesDto: UpdatePackagesDto) {
        return this.packagesService.update(Number(id_packages), updatePackagesDto);
    }

    @Delete('multiple')
    multipleDelete(@Query('id_packagess', new ParseArrayPipe({ items: String, separator: ',' })) id_packagess: string[]) {
        console.log("delete multi=> ", id_packagess)
        return this.packagesService.multipleDelete(id_packagess)
    }

    @UseGuards(AuthGuard)
    @Delete(':id_packages')
    delete(@Param('id_packages') id_packages: string) {
        return this.packagesService.delete(Number(id_packages));
    }
}

