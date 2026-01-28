import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/database/prisma.service'

@Injectable()
export class AuditService {
    constructor(private readonly prisma: PrismaService) {}

    async log(params: {
        userId?: string
        action: string
        entity: string
        entityId?: string
        metadata?: any
    }) {
        return this.prisma.auditLog.create({
            data: {
                userId: params.userId || null,
                action: params.action,
                entity: params.entity,
                entityId: params.entityId || null,
                metadata: params.metadata || null
            }
        })
    }

    async findAll() {
        return this.prisma.auditLog.findMany({
            orderBy: { createdAt: 'desc' }
        })
    }

    async findByUser(userId: string) {
        return this.prisma.auditLog.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
    }
}
