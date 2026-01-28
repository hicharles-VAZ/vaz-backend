import { INestApplication } from '@nestjs/common'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

export function securityBootstrap(app: INestApplication) {
    app.use(helmet())
    app.use(
        cors({
            origin: true,
            credentials: true
        })
    )
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 1000
        })
    )
}
