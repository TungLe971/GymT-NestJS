import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository, DeleteResult, In, Like, UpdateResult } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { FilterMemberDto } from './dto/filter-member.dto';

@Injectable()
export class MemberService {
    constructor(@InjectRepository(Member) private memberRepository: Repository<Member>) { }

    async findAll(query: FilterMemberDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 6;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const keyword = query.search || '';
        const [members, total] = await this.memberRepository.findAndCount({
            where: [
                { name_hv: Like('%' + keyword + '%') },
                { email_hv: Like('%' + keyword + '%') }
            ],
            take: items_per_page,
            skip: skip,
            select: ['id_hv', 'name_hv', 'email_hv', 'ngay_sinh_hv', 'gioi_tinh_hv', 'tuoi_hv', 'sdt_hv', 'tcccd_hv', 'bien_xe_hv', 'diem_tich_luy','chieu_cao','can_nang','phan_tram_mo', 'ngay_tao_hv', 'ngay_cap_nhap_hv']
        });
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            data: members,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }

    async findOne(id_hv: number): Promise<Member> {
        return await this.memberRepository.findOneBy({ id_hv });
    }

    async create(createMemberDto: CreateMemberDto): Promise<Member> {
        return await this.memberRepository.save(createMemberDto);
    }

    async update(id_hv: number, updateMemberDto: UpdateMemberDto): Promise<UpdateResult> {
        return await this.memberRepository.update(id_hv, updateMemberDto);
    }

    async delete(id_hv: number): Promise<DeleteResult> {
        return await this.memberRepository.delete(id_hv);
    }

    async multipleDelete(id_hvs: string[]): Promise<DeleteResult> {
        return await this.memberRepository.delete({ id_hv: In(id_hvs) });
    }
}

