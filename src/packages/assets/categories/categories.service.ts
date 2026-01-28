import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../../shared/database/prisma.service'

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.assetCategory.findMany()
    }

    async findOne(id: string) {
        const category = await this.prisma.assetCategory.findUnique({ where: { id } })
        if (!category) {
            throw new NotFoundException()
        }
        return category
    }

    create(dto: any) {
        return this.prisma.assetCategory.create({
            data: dto
        })
    }

    async update(id: string, dto: any) {
        await this.findOne(id)
        return this.prisma.assetCategory.update({
            where: { id },
            data: dto
        })
    }

    async remove(id: string) {
        await this.findOne(id)
        return this.prisma.assetCategory.delete({
            where: { id }
        })
    }
}
