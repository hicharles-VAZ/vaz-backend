import { IsEmail, IsBoolean, IsOptional } from 'class-validator'

export class FilterUserDto {
    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsBoolean()
    active?: boolean
}
