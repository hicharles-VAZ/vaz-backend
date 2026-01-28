import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
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

    async login(user: any) {
        const payload = { sub: user.id, email: user.email }
        const accessToken = await this.jwtService.signAsync(payload)
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('jwt.refreshSecret'),
            expiresIn: this.configService.get<string>('jwt.refreshExpiresIn')
        })
        return {
            accessToken,
            refreshToken
        }
    }

    async refresh(user: any) {
        const payload = { sub: user.id, email: user.email }
        const accessToken = await this.jwtService.signAsync(payload)
        return {
            accessToken
        }
    }

    async logout(_: any) {
        return { success: true }
    }
}
