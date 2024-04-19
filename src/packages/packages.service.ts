import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Packages } from './entities/packages.entity';
import { Repository, DeleteResult, In, Like, UpdateResult } from 'typeorm';
import { CreatePackagesDto } from './dto/create-packages.dto';
import { UpdatePackagesDto } from './dto/update-packages.dto';
import { FilterPackagesDto } from './dto/filter-packages.dto';

@Injectable()
export class PackagesService {
    constructor(@InjectRepository(Packages) private packagesRepository: Repository<Packages>) { }

    async findAll(query: FilterPackagesDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 20;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const keyword = query.search || '';
        const [packagess, total] = await this.packagesRepository.findAndCount({
            where: [
                { name_packages: Like('%' + keyword + '%') },
            ],
            take: items_per_page,
            skip: skip,
            select: ['id_packages', 'name_packages','gia_packages','note_packages', 'ngay_tao_packages', 'ngay_cap_nhap_packages']
        });
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            data: packagess,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }

    async findOne(id_packages: number): Promise<Packages> {
        return await this.packagesRepository.findOneBy({ id_packages });
    }

    async create(createPackagesDto: CreatePackagesDto): Promise<Packages> {
        return await this.packagesRepository.save(createPackagesDto);
    }

    async update(id_packages: number, updatePackagesDto: UpdatePackagesDto): Promise<UpdateResult> {
        return await this.packagesRepository.update(id_packages, updatePackagesDto);
    }

    async delete(id_packages: number): Promise<DeleteResult> {
        return await this.packagesRepository.delete(id_packages);
    }

    async multipleDelete(id_packagess: string[]): Promise<DeleteResult> {
        return await this.packagesRepository.delete({ id_packages: In(id_packagess) });
    }
}

