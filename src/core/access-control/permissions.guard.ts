import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PermissionsService } from '../permissions/permissions.service'

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly permissionsService: PermissionsService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const required = this.reflector.get<string[]>('permissions', context.getHandler()) || []
        if (!required.length) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user
        if (!user || !user.roles) {
            throw new ForbiddenException()
        }

        for (const role of user.roles) {
            for (const permission of required) {
                const has = await this.permissionsService.roleHasPermission(role.id, permission)
                if (has) {
                    return true
                }
            }
        }

        throw new ForbiddenException()
    }
}
