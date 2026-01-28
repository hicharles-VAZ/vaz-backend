import { Injectable } from '@nestjs/common'
import { CronJob } from 'cron'
import { CronRegistry } from './cron.registry'
import { CronTask } from './interfaces/cron-task.interface'

@Injectable()
export class SchedulerService {
    constructor(private readonly registry: CronRegistry) {}

    register(task: CronTask) {
        const job = new CronJob(task.cron, () => task.handle())
        this.registry.add(task.name, job)
        job.start()
    }

    stop(name: string) {
        const job = this.registry.get(name)
        if (job) {
            job.stop()
        }
    }

    start(name: string) {
        const job = this.registry.get(name)
        if (job) {
            job.start()
        }
    }
}
