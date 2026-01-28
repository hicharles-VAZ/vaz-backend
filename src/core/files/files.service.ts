import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LocalStorage } from './storage/local.storage'
import { S3Storage } from './storage/s3.storage'
import { UploadFileDto } from './dto/upload-file.dto'

@Injectable()
export class FilesService {
    constructor(
        private readonly configService: ConfigService,
        private readonly localStorage: LocalStorage,
        private readonly s3Storage: S3Storage
    ) {}

    async upload(file: Express.Multer.File, dto: UploadFileDto) {
        const driver = this.configService.get<string>('storage.driver')
        if (driver === 's3') {
            return this.s3Storage.upload(file, dto)
        }
        if (driver === 'local') {
            return this.localStorage.upload(file, dto)
        }
        throw new InternalServerErrorException()
    }
}
