import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../shared/database/prisma.service'
import { SchedulerService } from '../../core/scheduler/scheduler.service'
import { NotificationsService } from '../../core/notifications/notifications.service'
import { AuditService } from '../../core/audit/audit.service'
import { ExecutionsService } from './executions/executions.service'
import { ToggleAutomationDto } from './dto/toggle-automation.dto'

@Injectable()
export class AutomationsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly scheduler: SchedulerService,
        private readonly notifications: NotificationsService,
        private readonly audit: AuditService,
        private readonly executions: ExecutionsService
    ) {}

    findAll() {
        return this.prisma.automation.findMany()
    }

    async findOne(id: string) {
        const automation = await this.prisma.automation.findUnique({ where: { id } })
        if (!automation) {
            throw new NotFoundException()
        }
        return automation
    }

    async toggle(id: string, dto: ToggleAutomationDto) {
        await this.findOne(id)

        const automation = await this.prisma.automation.update({
            where: { id },
            data: {
                enabled: dto.enabled
            }
        })

        await this.audit.log({
            action: dto.enabled ? 'enable' : 'disable',
            entity: 'automation',
            entityId: id,
            metadata: dto
        })

        return automation
    }

    async run(id: string) {
        const automation = await this.findOne(id)

        const execution = await this.executions.create({
            automationId: id,
            status: 'running'
        })

        try {
            if (automation.notify && automation.recipients?.length) {
                await this.notifications.send({
                    channel: automation.channel,
                    recipients: automation.recipients,
                    subject: `Automação executada: ${automation.name}`,
                    message: `A automação ${automation.name} foi executada manualmente.`
                })
            }

            await this.executions.finish(execution.id, 'success')

            await this.audit.log({
                action: 'run',
                entity: 'automation',
                entityId: id
            })

            return { success: true }
        } catch {
            await this.executions.finish(execution.id, 'failed')
            return { success: false }
        }
    }
}
