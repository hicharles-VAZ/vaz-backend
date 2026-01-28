import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env.schema'
import { envLoader } from './env.loader'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: envSchema,
            load: [envLoader]
        })
    ]
})
export class ConfigCoreModule {}
