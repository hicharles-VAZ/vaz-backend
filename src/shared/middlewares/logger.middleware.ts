import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d'
        })
    ]
})

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now()

        res.on('finish', () => {
            const duration = Date.now() - start

            logger.info({
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                duration,
                ip: req.ip,
                userAgent: req.headers['user-agent']
            })
        })

        next()
    }
}
