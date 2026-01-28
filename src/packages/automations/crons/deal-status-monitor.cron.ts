import { Injectable } from '@nestjs/common'
import { CronTask } from '../../../core/scheduler/interfaces/cron-task.interface'
import { PrismaService } from '../../../shared/database/prisma.service'
import { NotificationsService } from '../../../core/notifications/notifications.service'
import { AuditService } from '../../../core/audit/audit.service'

@Injectable()
export class DealStatusMonitorCron implements CronTask {
    name = 'deal-status-monitor'
    cron = '*/10 * * * *'

    constructor(
        private readonly prisma: PrismaService,
        private readonly notifications: NotificationsService,
        private readonly audit: AuditService
    ) {}

    async handle() {
        const automations = await this.prisma.automation.findMany({
            where: { enabled: true }
        })

        for (const automation of automations) {
            if (!automation.notify || !automation.recipients?.length) {
                continue
            }

            await this.notifications.send({
                channel: automation.channel,
                recipients: automation.recipients,
                subject: `Automação ativa: ${automation.name}`,
                message: `A automação ${automation.name} foi executada pelo agendador.`
            })

            await this.audit.log({
                action: 'cron-run',
                entity: 'automation',
                entityId: automation.id
            })
        }
    }
}
