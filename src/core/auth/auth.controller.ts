import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RefreshAuthGuard } from './guards/refresh-auth.guard'
import { CurrentUser } from './decorators/current-user.decorator'
import { LoginDto } from './dto/login.dto'
import { RefreshDto } from './dto/refresh.dto'
import { LogoutDto } from './dto/logout.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Body() _: LoginDto, @CurrentUser() user: any) {
        return this.authService.login(user)
    }

    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    refresh(@Body() dto: RefreshDto, @CurrentUser() user: any, @Req() req: Request) {
        const header = req.headers.authorization || ''
        const token = header.replace('Bearer ', '').trim()
        return this.authService.refresh(user, token || dto.refreshToken)
    }

    @Post('logout')
    logout(@Body() dto: LogoutDto) {
        return this.authService.logout(dto)
    }
}
