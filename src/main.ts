import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import cors from 'cors'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { LoggerMiddleware } from './shared/middlewares/logger.middleware'
import { RateLimitMiddleware } from './shared/middlewares/rate-limit.middleware'
import { HttpExceptionFilter } from './shared/filters/http-exception.filter'
import { AuditInterceptor } from './shared/interceptors/audit.interceptor'
import { PrismaService } from './shared/database/prisma.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.use(helmet())
    app.use(cors())

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    )

    app.use(new LoggerMiddleware().use)
    app.use(new RateLimitMiddleware().use)

    app.useGlobalFilters(new HttpExceptionFilter())

    const audit = app.get(AuditInterceptor)
    app.useGlobalInterceptors(audit)

    const config = new DocumentBuilder()
        .setTitle('Vaz Plataforma Corporativa')
        .setDescription('API oficial da plataforma vazdesenvolvimento.com.br')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)

    const prisma = app.get(PrismaService)
    await prisma.enableShutdownHooks(app)

    const port = process.env.PORT ? Number(process.env.PORT) : 3000
    await app.listen(port)
}

bootstrap()
