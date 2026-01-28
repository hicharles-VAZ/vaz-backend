import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'
import { PrismaService } from '../../shared/database/prisma.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email)
        if (!user) {
            throw new UnauthorizedException()
        }

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            throw new UnauthorizedException()
        }

        return user
    }

    private resolveExpiration(value: string): Date {
        const now = Date.now()
        const match = /^(\d+)(s|m|h|d)$/.exec(value)
        if (!match) {
            return new Date(now + 7 * 24 * 60 * 60 * 1000)
        }

        const amount = Number(match[1])
        const unit = match[2]

        const multiplier =
            unit === 's'
                ? 1000
                : unit === 'm'
                    ? 1000 * 60
                    : unit === 'h'
                        ? 1000 * 60 * 60
                        : 1000 * 60 * 60 * 24

        return new Date(now + amount * multiplier)
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email }

        const accessToken = await this.jwtService.signAsync(payload)

        const refreshSecret = this.configService.get<string>('jwt.refreshSecret')!
        const refreshExpires = this.configService.get<string>('jwt.refreshExpiresIn')!

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: refreshSecret,
            expiresIn: refreshExpires
        })

        const tokenHash = await bcrypt.hash(refreshToken, 10)

        await this.prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt: this.resolveExpiration(refreshExpires)
            }
        })

        return {
            accessToken,
            refreshToken
        }
    }

    async refresh(user: any, refreshToken: string) {
        const tokens = await this.prisma.refreshToken.findMany({
            where: {
                userId: user.id,
                revokedAt: null
            }
        })

        let validToken: { id: string } | null = null

        for (const token of tokens) {
            const ok = await bcrypt.compare(refreshToken, token.tokenHash)
            if (ok) {
                validToken = token
                break
            }
        }

        if (!validToken) {
            throw new UnauthorizedException()
        }

        await this.prisma.refreshToken.update({
            where: { id: validToken.id },
            data: { revokedAt: new Date() }
        })

        return this.login(user)
    }

    async logout(dto: { refreshToken: string }) {
        const tokens = await this.prisma.refreshToken.findMany({
            where: {
                revokedAt: null
            }
        })

        for (const token of tokens) {
            const ok = await bcrypt.compare(dto.refreshToken, token.tokenHash)
            if (ok) {
                await this.prisma.refreshToken.update({
                    where: { id: token.id },
                    data: { revokedAt: new Date() }
                })
                return { success: true }
            }
        }

        throw new UnauthorizedException()
    }
}
