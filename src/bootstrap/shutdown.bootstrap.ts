import { INestApplication } from '@nestjs/common'

export function shutdownBootstrap(app: INestApplication) {
    const server = app.getHttpServer()
    process.on('SIGTERM', async () => {
        if (server && server.close) {
            await server.close()
        }
        process.exit(0)
    })
    process.on('SIGINT', async () => {
        if (server && server.close) {
            await server.close()
        }
        process.exit(0)
    })
}
