import { Injectable } from '@nestjs/common'
import { UploadFileDto } from '../dto/upload-file.dto'
import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'

@Injectable()
export class LocalStorage {
    async upload(file: Express.Multer.File, dto: UploadFileDto) {
        const filename = `${randomUUID()}-${file.originalname}`
        const basePath = join(process.cwd(), 'storage', dto.folder || 'default')

        await mkdir(basePath, { recursive: true })
        const filePath = join(basePath, filename)

        await writeFile(filePath, file.buffer)

        return {
            filename,
            path: filePath,
            size: file.size,
            mimetype: file.mimetype
        }
    }
}
