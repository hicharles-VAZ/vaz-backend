import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { AuditService } from '../../core/audit/audit.service'

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(private readonly auditService: AuditService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest()
        const user = request.user

        return next.handle().pipe(
            tap(() => {
                this.auditService.log({
                    userId: user?.id,
                    action: request.method,
                    entity: request.route?.path,
                    entityId: request.params?.id,
                    metadata: {
                        body: request.body,
                        query: request.query
                    }
                })
            })
        )
    }
}
