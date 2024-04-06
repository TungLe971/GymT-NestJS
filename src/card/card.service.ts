import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, In } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { FilterCardDto } from './dto/filter-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async findAll(query: FilterCardDto): Promise<any> {
    const itemsPerPage: number = Number(query.items_per_page) || 10;
    const page: number = Number(query.page) || 1;
    const search: number = Number(query.search) || 0;
    const skip: number = (page - 1) * itemsPerPage;

    const [cards, total] = await this.cardRepository.findAndCount({
      where: { id_card: search }, 
      take: itemsPerPage,
      skip: skip,
      relations: ['id_hv', 'id_packages', 'id_nv']
    });

    const formattedCards = cards.map(card => ({
      id: card.id_card,
      ngay_start: card.ngay_start,
      ngay_end: card.ngay_end,
      status: card.status,
      created_at: card.created_at,
      updated_at: card.updated_at,
      id_hv: card?.id_hv ? { id: card.id_hv } : null,
      id_packages: card?.id_packages ? { id: card.id_packages } : null,
      id_nv: card?.id_nv ? { id: card.id_nv } : null
    }));

    const lastPage: number = Math.ceil(total / itemsPerPage);
    const nextPage: number | null = page + 1 > lastPage ? null : page + 1;
    const prevPage: number | null = page - 1 < 1 ? null : page - 1;

    return {
      data: formattedCards,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage
    };
  }

  async findOne(id_card: number): Promise<Card> {
    return await this.cardRepository.findOne({ where: { id_card: id_card } });
  }  
  
  async create(createCardDto: CreateCardDto): Promise<Card> {
    return await this.cardRepository.save(createCardDto);
  }

  async update(id_card: number, updateCardDto: UpdateCardDto): Promise<UpdateResult> {
    return await this.cardRepository.update(id_card, { ...updateCardDto });
  }  

  async delete(id_card: number): Promise<DeleteResult> {
    return await this.cardRepository.delete(id_card);
  }

  async deleteMultiple(id_cards: number[]): Promise<DeleteResult> {
    return await this.cardRepository.delete({ id_card: In(id_cards) });
  }
}
