import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Repository, DeleteResult, In, Like, UpdateResult } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { FilterStaffDto } from './dto/filter-staff.dto';

@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>) { }

    async findAll(query: FilterStaffDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const keyword = query.search || '';
        const [staffs, total] = await this.staffRepository.findAndCount({
            where: [
                { name_nv: Like('%' + keyword + '%') },
                { email_nv: Like('%' + keyword + '%') }
            ],
            take: items_per_page,
            skip: skip,
            select: ['id_nv', 'name_nv', 'email_nv', 'ngay_sinh_nv', 'gioi_tinh_nv', 'tuoi_nv', 'sdt_nv', 'tcccd_nv', 'bien_xe_nv','chuc_vu','dia_chi_nv', 'ngay_tao_nv', 'ngay_cap_nhap_nv']
        });
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            data: staffs,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }

    async findOne(id_nv: number): Promise<Staff> {
        return await this.staffRepository.findOneBy({ id_nv });
    }

    async create(createStaffDto: CreateStaffDto): Promise<Staff> {
        return await this.staffRepository.save(createStaffDto);
    }

    async update(id_nv: number, updateStaffDto: UpdateStaffDto): Promise<UpdateResult> {
        return await this.staffRepository.update(id_nv, updateStaffDto);
    }

    async delete(id_nv: number): Promise<DeleteResult> {
        return await this.staffRepository.delete(id_nv);
    }

    async multipleDelete(id_nvs: string[]): Promise<DeleteResult> {
        return await this.staffRepository.delete({ id_nv: In(id_nvs) });
    }
}

