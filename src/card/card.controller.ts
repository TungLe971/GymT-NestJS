import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './entities/card.entity';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
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

    @UseGuards(AuthGuard)
    @Post(':hvId/:nvId/:packagesId')
    create(@Param('hvId') hvId: string, @Param('nvId') nvId: string, @Param('packagesId') packagesId: string, @Body() createCardDto: CreateCardDto): Promise<Card> {
        return this.cardService.create(Number(hvId), Number(nvId), Number(packagesId), createCardDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id_card')
    update(@Param('id_card') id_card: string, @Body() updateCardDto: UpdateCardDto) {
        return this.cardService.update(Number(id_card), updateCardDto);
    }

    @Delete(':id_card')
    delete(@Param('id_card') id_card: string) {
        return this.cardService.delete(Number(id_card));
    }

    @Delete()
    multipleDelete(@Query('id_cards', new ParseArrayPipe({ items: String, separator: ',' })) id_cards: string[]) {
        console.log("delete multi=> ", id_cards)
        return this.cardService.deleteMultiple(id_cards.map(Number));
    }
}
