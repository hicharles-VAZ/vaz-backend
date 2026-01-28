import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../shared/database/prisma.service'
import { FilesService } from '../../core/files/files.service'
import { ReportsService } from '../../core/reports/reports.service'
import { AuditService } from '../../core/audit/audit.service'

@Injectable()
export class AssetsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly filesService: FilesService,
        private readonly reportsService: ReportsService,
        private readonly auditService: AuditService
    ) {}

    async findAll(query: any) {
        return this.prisma.asset.findMany({
            where: query
        })
    }

    async findOne(id: string) {
        const asset = await this.prisma.asset.findUnique({ where: { id } })
        if (!asset) {
            throw new NotFoundException()
        }
        return asset
    }

    async create(dto: any) {
        const asset = await this.prisma.asset.create({
            data: dto
        })

        await this.auditService.log({
            action: 'create',
            entity: 'asset',
            entityId: asset.id,
            metadata: dto
        })

        return asset
    }

    async update(id: string, dto: any) {
        await this.findOne(id)

        const asset = await this.prisma.asset.update({
            where: { id },
            data: dto
        })

        await this.auditService.log({
            action: 'update',
            entity: 'asset',
            entityId: id,
            metadata: dto
        })

        return asset
    }

    async remove(id: string) {
        await this.findOne(id)

        const asset = await this.prisma.asset.delete({
            where: { id }
        })

        await this.auditService.log({
            action: 'delete',
            entity: 'asset',
            entityId: id
        })

        return asset
    }

    async exportReport(format: 'pdf' | 'excel' | 'csv') {
        const data = await this.prisma.asset.findMany()
        return this.reportsService.export(format, data, 'assets-report')
    }

    async uploadFile(file: Express.Multer.File, dto: any) {
        return this.filesService.upload(file, dto)
    }
}
