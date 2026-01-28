import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/database/prisma.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { AssignRoleDto } from './dto/assign-role.dto'

@Injectable()
export class RolesService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.role.findMany({
            include: {
                permissions: true
            }
        })
    }

    create(dto: CreateRoleDto) {
        return this.prisma.role.create({
            data: {
                name: dto.name,
                description: dto.description
            }
        })
    }

    async assign(dto: AssignRoleDto) {
        return this.prisma.user.update({
            where: { id: dto.userId },
            data: {
                roles: {
                    connect: { id: dto.roleId }
                }
            }
        })
    }
}
