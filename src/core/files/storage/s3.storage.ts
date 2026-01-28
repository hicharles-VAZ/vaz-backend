import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { UploadFileDto } from '../dto/upload-file.dto'
import fetch from 'isomorphic-fetch'

@Injectable()
export class S3Storage {
    async upload(file: Express.Multer.File, dto: UploadFileDto) {
        if (!dto.presignedUrl) {
            throw new BadRequestException()
        }

        const response = await fetch(dto.presignedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.mimetype,
                'Content-Length': String(file.size)
            },
            body: file.buffer
        })

        if (!response.ok) {
            throw new InternalServerErrorException()
        }

        return {
            filename: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            url: dto.publicUrl || null
        }
    }
}
