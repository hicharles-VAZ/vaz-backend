import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../../shared/database/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwt.secret'),
            ignoreExpiration: false
        })
    }

    async validate(payload: { sub: string; email: string }) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            include: {
                roles: {
                    include: {
                        permissions: true
                    }
                }
            }
        })

        if (!user || !user.active) {
            return null
        }

        const permissions = user.roles.flatMap(r => r.permissions.map(p => p.name))

        return {
            id: user.id,
            email: user.email,
            roles: user.roles.map(r => r.name),
            permissions
        }
    }
}
