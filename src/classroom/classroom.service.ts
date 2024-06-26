import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
import { Repository, DeleteResult, In, Like, UpdateResult } from 'typeorm';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { FilterClassroomDto } from './dto/filter-classroom.dto';
import { Card } from 'src/card/entities/card.entity';
import { Staff } from 'src/staff/entities/staff.entity';

@Injectable()
export class ClassroomService {
    constructor(
        @InjectRepository(Classroom) private classroomRepository: Repository<Classroom>, 
        @InjectRepository(Staff) private staffRepository: Repository<Staff>,
        @InjectRepository(Card) private cardRepository: Repository<Card>,
    ) { }
    async findAll(query: FilterClassroomDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 20;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const keyword = query.search || '';
       
            select: ['id_classroom', 'name_classroom','so_luong_classroom', 'day_classroom','thoi_luong_classroom', 'status', 'ngay_start', 'ngay_end', 'ngay_tao_classroom', 'ngay_cap_nhap_classroom']
       
        const [res, total] = await this.classroomRepository.findAndCount({

            where: [
                { name_classroom: Like('%' + keyword + '%') },
            ],
            take: items_per_page,
            skip: skip,
            relations: {card: true, staff: true},
            select: {
                card: {
                    id_card: true
                },
                staff: {
                    id_nv: true,
                    name_nv: true
                }
            }
        })

        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            data: res,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }

    async findDetail(id_classroom: number): Promise<Classroom> {
        return await this.classroomRepository.findOne({
            where: { id_classroom },
            relations: ['card', 'staff'],
            select: {
                card: {
                    id_card: true
                },
                staff: {
                    id_nv: true,
                    name_nv: true
                }
            }
        })
    }

    async create(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
        return await this.classroomRepository.save(createClassroomDto);
    }

    async update(id_classroom: number, updateClassroomDto: UpdateClassroomDto): Promise<UpdateResult> {
        return await this.classroomRepository.update(id_classroom, updateClassroomDto);
    }

    async delete(id_classroom: number): Promise<DeleteResult> {
        return await this.classroomRepository.delete(id_classroom);
    }

    async multipleDelete(id_classrooms: string[]): Promise<DeleteResult> {
        return await this.classroomRepository.delete({ id_classroom: In(id_classrooms) });
    }
}

