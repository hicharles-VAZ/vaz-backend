import { IsOptional, IsString } from 'class-validator'

export class UploadFileDto {
    @IsOptional()
    @IsString()
    folder?: string

    @IsOptional()
    @IsString()
    presignedUrl?: string

    @IsOptional()
    @IsString()
    publicUrl?: string
}