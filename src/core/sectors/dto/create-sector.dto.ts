import { IsString } from 'class-validator'

export class CreateSectorDto {
    @IsString()
    name: string

    @IsString()
    description: string
}
