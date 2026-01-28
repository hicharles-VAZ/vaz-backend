export class AuditLog {
    id: string
    userId: string | null
    action: string
    entity: string
    entityId: string | null
    metadata: any
    createdAt: Date
}
