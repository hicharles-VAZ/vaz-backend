import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common'
import { AssetsService } from './assets.service'

@Controller('assets')
export class AssetsController {
    constructor(private readonly assetsService: AssetsService) {}

    @Get()
    findAll(@Query() query: any) {
        return this.assetsService.findAll(query)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.assetsService.findOne(id)
    }

    @Post()
    create(@Body() dto: any) {
        return this.assetsService.create(dto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: any) {
        return this.assetsService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.assetsService.remove(id)
    }
}
