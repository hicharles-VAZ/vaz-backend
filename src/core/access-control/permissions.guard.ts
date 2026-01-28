import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const required = this.reflector.get<string[]>('permissions', context.getHandler()) || []
        if (!required.length) return true

        const request = context.switchToHttp().getRequest()
        const user = request.user

        if (!user || !Array.isArray(user.permissions)) {
            throw new ForbiddenException()
        }

        const allowed = required.every(p => user.permissions.includes(p))
        if (!allowed) {
            throw new ForbiddenException()
        }

        return true
    }
}
