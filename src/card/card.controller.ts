import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Query, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './entities/card.entity';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { FilterCardDto } from './dto/filter-card.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Cards')
@Controller('cards')
export class CardController {
    constructor(private cardService: CardService) {}

    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Get()
    findAll(@Query() query: FilterCardDto): Promise<any> {
        console.log(query);
        return this.cardService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id_card')
    findOne(@Param('id_card') id_card: string): Promise<Card> {
        return this.cardService.findDetail(Number(id_card));
    }

    @Get('update-status')
    async updateCardStatus(): Promise<void> {
        await this.cardService.updateCardStatus();
    }
    
    @UseGuards(AuthGuard)
    @Post('')
    create( @Body() createCardDto: CreateCardDto): Promise<Card> {
        return this.cardService.create(createCardDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id_card')
    delete(@Param('id_card') id_card: string) {
        return this.cardService.delete(Number(id_card));
    }

    @Delete('multiple')
    multipleDelete(@Query('id_cards', new ParseArrayPipe({ items: String, separator: ',' })) id_cards: string[]) {
        console.log("delete multi=> ", id_cards)
        return this.cardService.deleteMultiple(id_cards.map(Number));
    }
}
