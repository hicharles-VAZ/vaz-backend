import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../shared/database/prisma.service'

@Injectable()
export class HistoryService {
    constructor(private readonly prisma: PrismaService) {}

    findByAsset(assetId: string) {
        return this.prisma.assetHistory.findMany({
            where: { assetId },
            orderBy: { createdAt: 'desc' }
        })
    }

    create(data: {
        assetId: string
        action: string
        description?: string
        metadata?: any
    }) {
        return this.prisma.assetHistory.create({
            data: {
                assetId: data.assetId,
                action: data.action,
                description: data.description || null,
                metadata: data.metadata || null
            }
        })
    }
}
