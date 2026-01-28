import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common'
import { AutomationsService } from './automations.service'
import { ToggleAutomationDto } from './dto/toggle-automation.dto'

@Controller('automations')
export class AutomationsController {
    constructor(private readonly automationsService: AutomationsService) {}

    @Get()
    findAll() {
        return this.automationsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.automationsService.findOne(id)
    }

    @Put(':id/toggle')
    toggle(@Param('id') id: string, @Body() dto: ToggleAutomationDto) {
        return this.automationsService.toggle(id, dto)
    }

    @Post(':id/run')
    run(@Param('id') id: string) {
        return this.automationsService.run(id)
    }
}
