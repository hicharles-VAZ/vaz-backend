import { Module } from '@nestjs/common'
import { PermissionsModule } from '../permissions/permissions.module'
import { PermissionsGuard } from './permissions.guard'

@Module({
    imports: [PermissionsModule],
    providers: [PermissionsGuard],
    exports: [PermissionsGuard]
})
export class AccessControlModule {}
