import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { securityBootstrap } from './bootstrap/security.bootstrap'
import { swaggerBootstrap } from './bootstrap/swagger.bootstrap'
import { validationBootstrap } from './bootstrap/validation.bootstrap'
import { shutdownBootstrap } from './bootstrap/shutdown.bootstrap'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true })

    securityBootstrap(app)
    validationBootstrap(app)
    swaggerBootstrap(app)
    shutdownBootstrap(app)

    await app.listen(process.env.PORT || 3000)
}

bootstrap()
