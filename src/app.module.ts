import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { configuration } from './core/config/configuration'
import { ConfigCoreModule } from './core/config/config.module'
import { AuthModule } from './core/auth/auth.module'
import { UsersModule } from './core/users/users.module'
import { RolesModule } from './core/roles/roles.module'
import { PermissionsModule } from './core/permissions/permissions.module'
import { AccessControlModule } from './core/access-control/access-control.module'
import { SectorsModule } from './core/sectors/sectors.module'
import { FilesModule } from './core/files/files.module'
import { NotificationsModule } from './core/notifications/notifications.module'
import { SchedulerModule } from './core/scheduler/scheduler.module'
import { ReportsModule } from './core/reports/reports.module'
import { AuditModule } from './core/audit/audit.module'
import { HealthModule } from './core/health/health.module'
import { PrismaModule } from './shared/database/prisma.module'
import { AssetsModule } from './packages/assets/assets.module'
import { AutomationsModule } from './packages/automations/automations.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        }),
        ConfigCoreModule,
        PrismaModule,
        AuthModule,
        UsersModule,
        RolesModule,
        PermissionsModule,
        AccessControlModule,
        SectorsModule,
        FilesModule,
        NotificationsModule,
        SchedulerModule,
        ReportsModule,
        AuditModule,
        HealthModule,
        AssetsModule,
        AutomationsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
