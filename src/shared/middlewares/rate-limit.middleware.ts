import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { RateLimiterMemory } from 'rate-limiter-flexible'

const limiter = new RateLimiterMemory({
    points: 1000,
    duration: 900
})

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            await limiter.consume(req.ip)
            next()
        } catch {
            res.status(429).json({ message: 'Too many requests' })
        }
    }
}
