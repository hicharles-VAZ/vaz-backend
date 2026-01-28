export class Automation {
    id: string
    name: string
    description: string | null
    enabled: boolean
    notify: boolean
    channel: 'email' | 'teams'
    recipients: string[]
    cron: string | null
    createdAt: Date
    updatedAt: Date
}
