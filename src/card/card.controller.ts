import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { FilterCardDto } from './dto/filter-card.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Cards')
@Controller('cards')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'items_per_page', type: Number, required: false })
    @ApiQuery({ name: 'search', type: String, required: false })
    @Get()
    async findAll(@Query() query: FilterCardDto): Promise<any> {
        return this.cardService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id_card')
    async findOne(@Param('id_card') id_card: string): Promise<Card> {
        return this.cardService.findOne(+id_card);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
        return this.cardService.create(createCardDto);
    }

    @UseGuards(AuthGuard)
    @Patch(':id_card')
    async update(@Param('id_card') id_card: string, @Body() updateCardDto: UpdateCardDto): Promise<UpdateResult> {
        return this.cardService.update(+id_card, updateCardDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id_card')
    async delete(@Param('id_card') id_card: string): Promise<DeleteResult> {
        return this.cardService.delete(+id_card);
    }

    @UseGuards(AuthGuard)
    @Delete('multiple')
    async deleteMultiple(@Query('id_cards') id_cards: string): Promise<DeleteResult> {
        const id_cardsArray = id_cards.split(',').map(Number);
        return this.cardService.deleteMultiple(id_cardsArray);
    }
}
