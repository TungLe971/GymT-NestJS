import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { Repository, DeleteResult, In, Like, UpdateResult } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { FilterEquipmentDto } from './dto/filter-equipment.dto';

@Injectable()
export class EquipmentService {
    constructor(@InjectRepository(Equipment) private equipmentRepository: Repository<Equipment>) { }

    async findAll(query: FilterEquipmentDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 6;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const keyword = query.search || '';
        const [equipments, total] = await this.equipmentRepository.findAndCount({
            where: [
                { name_equipment: Like('%' + keyword + '%') },
                { loai_equipment: Like('%' + keyword + '%') },
                { status_equipment: Like('%' + keyword + '%') }
            ],
            take: items_per_page,
            skip: skip,
            select: ['id_equipment', 'name_equipment','gia_equipment','loai_equipment', 'so_luong_equipment','status_equipment','note_equipment', 'ngay_tao_equipment', 'ngay_cap_nhap_equipment']
        });
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            data: equipments,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }

    async findOne(id_equipment: number): Promise<Equipment> {
        return await this.equipmentRepository.findOneBy({ id_equipment });
    }

    async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
        return await this.equipmentRepository.save(createEquipmentDto);
    }

    async update(id_equipment: number, updateEquipmentDto: UpdateEquipmentDto): Promise<UpdateResult> {
        return await this.equipmentRepository.update(id_equipment, updateEquipmentDto);
    }

    async delete(id_equipment: number): Promise<DeleteResult> {
        return await this.equipmentRepository.delete(id_equipment);
    }

    async multipleDelete(id_equipments: string[]): Promise<DeleteResult> {
        return await this.equipmentRepository.delete({ id_equipment: In(id_equipments) });
    }
}

