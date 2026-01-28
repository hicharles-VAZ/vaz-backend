import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common'
import { SectorsService } from './sectors.service'
import { CreateSectorDto } from './dto/create-sector.dto'
import { UpdateSectorDto } from './dto/update-sector.dto'

@Controller('sectors')
export class SectorsController {
    constructor(private readonly sectorsService: SectorsService) {}

    @Get()
    findAll() {
        return this.sectorsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.sectorsService.findOne(id)
    }

    @Post()
    create(@Body() dto: CreateSectorDto) {
        return this.sectorsService.create(dto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateSectorDto) {
        return this.sectorsService.update(id, dto)
    }
}
