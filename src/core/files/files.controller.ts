import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'
import { UploadFileDto } from './dto/upload-file.dto'

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file: Express.Multer.File, @Body() dto: UploadFileDto) {
        return this.filesService.upload(file, dto)
    }
}
