import { Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../../shared/database/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FilterUserDto } from './dto/filter-user.dto'

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(filter: FilterUserDto) {
        return this.prisma.user.findMany({
            where: {
                email: filter.email,
                active: filter.active
            }
        })
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } })
        if (!user) {
            throw new NotFoundException()
        }
        return user
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } })
    }

    async create(dto: CreateUserDto) {
        const password = await bcrypt.hash(dto.password, 10)
        return this.prisma.user.create({
            data: {
                ...dto,
                password
            }
        })
    }

    async update(id: string, dto: UpdateUserDto) {
        await this.findOne(id)
        return this.prisma.user.update({
            where: { id },
            data: dto
        })
    }
}
