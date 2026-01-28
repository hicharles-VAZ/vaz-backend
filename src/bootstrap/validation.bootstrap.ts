import { INestApplication, ValidationPipe } from '@nestjs/common'

export function validationBootstrap(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    )
}
