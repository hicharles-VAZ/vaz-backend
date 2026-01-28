export interface CronTask {
    name: string
    cron: string
    handle(): Promise<void> | void
}
