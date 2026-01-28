import { Module } from '@nestjs/common'
import { AutomationsController } from './automations.controller'
import { AutomationsService } from './automations.service'
import { PrismaModule } from '../../shared/database/prisma.module'
import { SchedulerModule } from '../../core/scheduler/scheduler.module'
import { NotificationsModule } from '../../core/notifications/notifications.module'
import { AuditModule } from '../../core/audit/audit.module'
import { ExecutionsService } from './executions/executions.service'

@Module({
    imports: [PrismaModule, SchedulerModule, NotificationsModule, AuditModule],
    controllers: [AutomationsController],
    providers: [AutomationsService, ExecutionsService],
    exports: [AutomationsService]
})
export class AutomationsModule {}
