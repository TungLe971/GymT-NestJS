import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FilterNotificationDto } from './dto/filter-notification.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
    constructor(private notificationService: NotificationService) {}

    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Get()
    findAll(@Query() query: FilterNotificationDto): Promise<Notification[]> {
        console.log(query);
        return this.notificationService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id_n')
    findOne(@Param('id_n') id_n: string): Promise<Notification> {
        return this.notificationService.findOne(Number(id_n));
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return this.notificationService.create(createNotificationDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id_n')
    update(@Param('id_n') id_n: string, @Body() updateNotificationDto: UpdateNotificationDto) {
        return this.notificationService.update(Number(id_n), updateNotificationDto);
    }

    @Delete('multiple')
    multipleDelete(@Query('id_ns', new ParseArrayPipe({ items: String, separator: ',' })) id_ns: string[]) {
        console.log("delete multi=> ", id_ns)
        return this.notificationService.multipleDelete(id_ns)
    }

    @UseGuards(AuthGuard)
    @Delete(':id_n')
    delete(@Param('id_n') id_n: string) {
        return this.notificationService.delete(Number(id_n));
    }
}

