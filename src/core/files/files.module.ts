import { Module } from '@nestjs/common'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'
import { LocalStorage } from './storage/local.storage'
import { S3Storage } from './storage/s3.storage'

@Module({
    controllers: [FilesController],
    providers: [FilesService, LocalStorage, S3Storage],
    exports: [FilesService]
})
export class FilesModule {}
