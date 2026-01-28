import { IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator'

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsBoolean()
    active?: boolean
}
