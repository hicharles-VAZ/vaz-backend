import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/database/prisma.service'
import { Permission } from './entities/permission.entity'

@Injectable()
export class PermissionsService {
    constructor(private readonly prisma: PrismaService) {}

    findAll(): Promise<Permission[]> {
        return this.prisma.permission.findMany()
    }

    async roleHasPermission(roleId: string, permission: string): Promise<boolean> {
        const count = await this.prisma.permission.count({
            where: {
                name: permission,
                roles: {
                    some: {
                        id: roleId
                    }
                }
            }
        })
        return count > 0
    }
}
