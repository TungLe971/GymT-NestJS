import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { Food } from './entities/food.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FilterFoodDto } from './dto/filter-food.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Foods')
@Controller('foods')
export class FoodController {
    constructor(private foodService: FoodService) {}

    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Get()
    findAll(@Query() query: FilterFoodDto): Promise<Food[]> {
        console.log(query);
        return this.foodService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id_food')
    findOne(@Param('id_food') id_food: string): Promise<Food> {
        return this.foodService.findOne(Number(id_food));
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
        return this.foodService.create(createFoodDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id_food')
    update(@Param('id_food') id_food: string, @Body() updateFoodDto: UpdateFoodDto) {
        return this.foodService.update(Number(id_food), updateFoodDto);
    }

    @Delete('multiple')
    multipleDelete(@Query('id_foods', new ParseArrayPipe({ items: String, separator: ',' })) id_foods: string[]) {
        console.log("delete multi=> ", id_foods)
        return this.foodService.multipleDelete(id_foods)
    }

    @UseGuards(AuthGuard)
    @Delete(':id_food')
    delete(@Param('id_food') id_food: string) {
        return this.foodService.delete(Number(id_food));
    }
}

