import { Controller, Get, Post, Body } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { AssignRoleDto } from './dto/assign-role.dto'

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    findAll() {
        return this.rolesService.findAll()
    }

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.create(dto)
    }

    @Post('assign')
    assign(@Body() dto: AssignRoleDto) {
        return this.rolesService.assign(dto)
    }
}
