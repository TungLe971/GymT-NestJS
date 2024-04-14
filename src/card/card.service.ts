import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { FilterCardDto } from './dto/filter-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult, In } from 'typeorm';
import { Member } from '../member/entities/member.entity';
import { Packages } from '../packages/entities/packages.entity';
import { Staff } from '../staff/entities/staff.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';

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

    async create(hvId: number, nvId: number, packagesId: number, classroomId: number, createCardDto: CreateCardDto): Promise<Card> {
        const member = await this.memberRepository.findOneBy({ id_hv: hvId });
        const staff = await this.staffRepository.findOneBy({ id_nv: nvId });
        const packages = await this.packagesRepository.findOneBy({ id_packages: packagesId });
        const classroom = await this.classroomRepository.findOneBy({ id_classroom: classroomId });
        try {
            const card = await this.cardRepository.create({
                ...createCardDto, member, staff, packages, classroom
            })
            const res = await this.cardRepository.save(card);
            return await this.cardRepository.findOneBy({ id_card: res.id_card });

        } catch (error) {
            throw new HttpException('Can not create card', HttpStatus.BAD_REQUEST);
        }
    }
    
    async findAll(query: FilterCardDto): Promise<any> {
        const itemsPerPage: number = Number(query.items_per_page) || 10;
        const page: number = Number(query.page) || 1;
        const search: number = query.search || 0;
        // const member = Number(query.member);
        // const staff = Number(query.staff) || null;
        // const packages = Number(query.packages);

        const skip: number = (page - 1) * itemsPerPage;
        const [res, total] = await this.cardRepository.findAndCount({

            where: search !== 0 ? { id_card: search } : {},
            
            take: itemsPerPage,
            skip: skip,
            relations: ['member', 'staff', 'packages', 'classroom'],
            select: {
                member: {
                    id_hv: true,
                    name_hv: true
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
            relations: ['member', 'staff', 'packages','classroom'],
            select: {
                member: {
                    id_hv: true,
                    name_hv: true
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

    async update(id_card: number, updateCardDto: UpdateCardDto): Promise<UpdateResult> {
        return await this.cardRepository.update(id_card, updateCardDto);
    }

    async delete(id_card: number): Promise<DeleteResult> {
        return await this.cardRepository.delete(id_card);
    }

    async deleteMultiple(id_cards: number[]): Promise<DeleteResult> {
        return await this.cardRepository.delete({ id_card: In(id_cards) });
    }
}
