import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository, DeleteResult, In, Like, UpdateResult } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FilterNotificationDto } from './dto/filter-notification.dto';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>) { }

    async findAll(query: FilterNotificationDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 6;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const keyword = query.search || '';
        const [notifications, total] = await this.notificationRepository.findAndCount({
            where: [
                { title_n: Like('%' + keyword + '%') },
            ],
            take: items_per_page,
            skip: skip,
            select: ['id_n', 'title_n','noi_dung_n','status_n', 'ngay_tao_n', 'ngay_cap_nhap_n']
        });
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            data: notifications,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }

    async findOne(id_n: number): Promise<Notification> {
        return await this.notificationRepository.findOneBy({ id_n });
    }

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return await this.notificationRepository.save(createNotificationDto);
    }

    async update(id_n: number, updateNotificationDto: UpdateNotificationDto): Promise<UpdateResult> {
        return await this.notificationRepository.update(id_n, updateNotificationDto);
    }

    async delete(id_n: number): Promise<DeleteResult> {
        return await this.notificationRepository.delete(id_n);
    }

    async multipleDelete(id_ns: string[]): Promise<DeleteResult> {
        return await this.notificationRepository.delete({ id_n: In(id_ns) });
    }
}

