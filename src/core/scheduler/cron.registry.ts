import { Injectable } from '@nestjs/common'
import { CronJob } from 'cron'

@Injectable()
export class CronRegistry {
    private readonly jobs = new Map<string, CronJob>()

    add(name: string, job: CronJob) {
        this.jobs.set(name, job)
    }

    get(name: string) {
        return this.jobs.get(name)
    }

    remove(name: string) {
        const job = this.jobs.get(name)
        if (job) {
            job.stop()
            this.jobs.delete(name)
        }
    }

    list() {
        return Array.from(this.jobs.keys())
    }
}
