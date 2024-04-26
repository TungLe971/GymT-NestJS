import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { FilterCardDto } from './dto/filter-card.dto';
import { Card } from './entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, In, UpdateResult } from 'typeorm';
import { Member } from '../member/entities/member.entity';
import { Packages } from '../packages/entities/packages.entity';
import { Staff } from '../staff/entities/staff.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
        @InjectRepository(Packages)
        private packagesRepository: Repository<Packages>,
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,
        @InjectRepository(Classroom)
        private classroomRepository: Repository<Classroom>,
        @InjectRepository(Card)
        private cardRepository: Repository<Card>,
    ) { }
    
    async findAll(query: FilterCardDto): Promise<any> {
        const itemsPerPage: number = Number(query.items_per_page) || 20;
        const page: number = Number(query.page) || 1;
        const search: number = query.search || 0;
        // const member = Number(query.member);
        
        const skip: number = (page - 1) * itemsPerPage;
        const [res, total] = await this.cardRepository.findAndCount({
            
            where: search !== 0 ? { id_card: search } : {},
            
            take: itemsPerPage,
            skip: skip,
            relations: {member: true, staff: true, packages: true, classroom: true},
            select: {
                member: {
                    id_hv: true,
                    name_hv: true,
                    email_hv: true,
                    sdt_hv: true
                },
                staff: {
                    id_nv: true,
                    name_nv: true
                },
                packages: {
                    id_packages: true,
                    name_packages: true,
                    gia_packages: true
                },
                classroom: {
                    id_classroom: true,
                    name_classroom: true,
                    so_luong_classroom: true
                }
            }
        })
        
        
        const lastPage: number = Math.ceil(total / itemsPerPage);
        const nextPage: number | null = page + 1 > lastPage ? null : page + 1;
        const prevPage: number | null = page - 1 < 1 ? null : page - 1;
        
        return {
            data: res,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }
    
    async findDetail(id_card: number): Promise<Card> {
        return await this.cardRepository.findOne({
            where: { id_card },
            relations: ['member', 'staff', 'packages', 'classroom'],
            select: {
                member: {
                    id_hv: true,
                    name_hv: true,
                    email_hv: true,
                    sdt_hv: true
                },
                staff: {
                    id_nv: true,
                    name_nv: true
                },
                packages: {
                    id_packages: true,
                    name_packages: true,
                    gia_packages: true
                },
                classroom: {
                    id_classroom: true,
                    name_classroom: true,
                    so_luong_classroom: true
                }
            }
        })
    }
    
    async create(createCardDto: CreateCardDto): Promise<Card> {
        return await this.cardRepository.save(createCardDto);
    }
    
    async delete(id_card: number): Promise<DeleteResult> {
        return await this.cardRepository.delete(id_card);
    }
    
    async deleteMultiple(id_cards: number[]): Promise<DeleteResult> {
        return await this.cardRepository.delete({ id_card: In(id_cards) });
    }

    async update(id_card: number, updateCardDto: UpdateCardDto): Promise<UpdateResult> {
        return await this.cardRepository.update(id_card, updateCardDto);
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async updateCardStatus() {
        // Lấy tất cả các thẻ có ngày kết thúc nhỏ hơn hoặc bằng ngày hiện tại
        const cardsToUpdate: Card[] = await this.cardRepository.createQueryBuilder("card")
            .where("card.ngay_end <= :ngay_end", { ngay_end: new Date().toISOString().split('T')[0] }) 
            .andWhere("card.status = :status", { status: 1 }) 
            .getMany();

        cardsToUpdate.forEach(async card => {
            card.status = 0;
            await this.cardRepository.save(card);
        });
    }
}
