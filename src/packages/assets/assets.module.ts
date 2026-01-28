import { Module } from '@nestjs/common'
import { AssetsController } from './assets.controller'
import { AssetsService } from './assets.service'
import { PrismaModule } from '../../shared/database/prisma.module'
import { FilesModule } from '../../core/files/files.module'
import { ReportsModule } from '../../core/reports/reports.module'
import { AuditModule } from '../../core/audit/audit.module'
import { CategoriesService } from './categories/categories.service'
import { CategoriesController } from './categories/categories.controller'
import { HistoryService } from './history/history.service'

@Module({
    imports: [PrismaModule, FilesModule, ReportsModule, AuditModule],
    controllers: [AssetsController, CategoriesController],
    providers: [AssetsService, CategoriesService, HistoryService],
    exports: [AssetsService]
})
export class AssetsModule {}
