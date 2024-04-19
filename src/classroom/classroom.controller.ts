import { Body, Controller, Delete, Get, NotFoundException, Param, ParseArrayPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { Classroom } from './entities/classroom.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { FilterClassroomDto } from './dto/filter-classroom.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Classrooms')
@Controller('classrooms')
export class ClassroomController {
    constructor(private classroomService: ClassroomService) {}

    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Get()
    findAll(@Query() query: FilterClassroomDto): Promise<Classroom[]> {
        console.log(query);
        return this.classroomService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id_classroom')
    findOne(@Param('id_classroom') id_classroom: string): Promise<Classroom> {
        if (!id_classroom) {
            throw new NotFoundException('Classroom not found');
        }
        return this.classroomService.findDetail(Number(id_classroom));
    }

    @UseGuards(AuthGuard)
    @Post('')
    create( @Body() createClassroomDto: CreateClassroomDto): Promise<Classroom> {
        return this.classroomService.create( createClassroomDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id_classroom')
    update(@Param('id_classroom') id_classroom: string, @Body() updateClassroomDto: UpdateClassroomDto) {
        return this.classroomService.update(Number(id_classroom), updateClassroomDto);
    }

    @Delete('multiple')
    multipleDelete(@Query('id_classrooms', new ParseArrayPipe({ items: String, separator: ',' })) id_classrooms: string[]) {
        console.log("delete multi=> ", id_classrooms)
        return this.classroomService.multipleDelete(id_classrooms)
    }

    @UseGuards(AuthGuard)
    @Delete(':id_classroom')
    delete(@Param('id_classroom') id_classroom: string) {
        return this.classroomService.delete(Number(id_classroom));
    }
}

