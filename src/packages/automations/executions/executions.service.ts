import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../shared/database/prisma.service'

@Injectable()
export class ExecutionsService {
    constructor(private readonly prisma: PrismaService) {}

    create(data: { automationId: string; status: string }) {
        return this.prisma.automationExecution.create({
            data: {
                automationId: data.automationId,
                status: data.status
            }
        })
    }

    finish(id: string, status: string) {
        return this.prisma.automationExecution.update({
            where: { id },
            data: { status }
        })
    }

    findByAutomation(automationId: string) {
        return this.prisma.automationExecution.findMany({
            where: { automationId },
            orderBy: { createdAt: 'desc' }
        })
    }
}
