import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../shared/database/prisma.service'
import { CreateSectorDto } from './dto/create-sector.dto'
import { UpdateSectorDto } from './dto/update-sector.dto'

@Injectable()
export class SectorsService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.sector.findMany()
    }

    async findOne(id: string) {
        const sector = await this.prisma.sector.findUnique({ where: { id } })
        if (!sector) {
            throw new NotFoundException()
        }
        return sector
    }

    create(dto: CreateSectorDto) {
        return this.prisma.sector.create({
            data: dto
        })
    }

    async update(id: string, dto: UpdateSectorDto) {
        await this.findOne(id)
        return this.prisma.sector.update({
            where: { id },
            data: dto
        })
    }
}
