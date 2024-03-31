import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository, DeleteResult, In, Like, UpdateResult } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FilterFoodDto } from './dto/filter-food.dto';

@Injectable()
export class FoodService {
    constructor(@InjectRepository(Food) private foodRepository: Repository<Food>) { }

    async findAll(query: FilterFoodDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 6;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const keyword = query.search || '';
        const [foods, total] = await this.foodRepository.findAndCount({
            where: [
                { name_food: Like('%' + keyword + '%') },
                { loai_food: Like('%' + keyword + '%') }
            ],
            take: items_per_page,
            skip: skip,
            select: ['id_food', 'name_food','loai_food','gia_nhap_food','gia_ban_food','so_luong_con_food','so_luong_nhap_food','note_food', 'ngay_tao_food', 'ngay_cap_nhap_food']
        });
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            data: foods,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }

    async findOne(id_food: number): Promise<Food> {
        return await this.foodRepository.findOneBy({ id_food });
    }

    async create(createFoodDto: CreateFoodDto): Promise<Food> {
        return await this.foodRepository.save(createFoodDto);
    }

    async update(id_food: number, updateFoodDto: UpdateFoodDto): Promise<UpdateResult> {
        return await this.foodRepository.update(id_food, updateFoodDto);
    }

    async delete(id_food: number): Promise<DeleteResult> {
        return await this.foodRepository.delete(id_food);
    }

    async multipleDelete(id_foods: string[]): Promise<DeleteResult> {
        return await this.foodRepository.delete({ id_food: In(id_foods) });
    }
}

