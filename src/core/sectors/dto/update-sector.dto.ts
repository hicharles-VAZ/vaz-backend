import { IsString, IsOptional } from 'class-validator'

export class UpdateSectorDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    description?: string
}
