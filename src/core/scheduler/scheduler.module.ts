import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { SchedulerService } from './scheduler.service'
import { CronRegistry } from './cron.registry'

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [SchedulerService, CronRegistry],
    exports: [SchedulerService, CronRegistry]
})
export class SchedulerModule {}
