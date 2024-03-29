import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { FilterMemberDto } from './dto/filter-member.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Members')
@Controller('members')
export class MemberController {
    constructor(private memberService: MemberService) {}

    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Get()
    findAll(@Query() query: FilterMemberDto): Promise<Member[]> {
        console.log(query);
        return this.memberService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id_hv')
    findOne(@Param('id_hv') id_hv: string): Promise<Member> {
        return this.memberService.findOne(Number(id_hv));
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
        return this.memberService.create(createMemberDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id_hv')
    update(@Param('id_hv') id_hv: string, @Body() updateMemberDto: UpdateMemberDto) {
        return this.memberService.update(Number(id_hv), updateMemberDto);
    }

    @Delete('multiple')
    multipleDelete(@Query('id_hvs', new ParseArrayPipe({ items: String, separator: ',' })) id_hvs: string[]) {
        console.log("delete multi=> ", id_hvs)
        return this.memberService.multipleDelete(id_hvs)
    }

    @UseGuards(AuthGuard)
    @Delete(':id_hv')
    delete(@Param('id_hv') id_hv: string) {
        return this.memberService.delete(Number(id_hv));
    }
}

