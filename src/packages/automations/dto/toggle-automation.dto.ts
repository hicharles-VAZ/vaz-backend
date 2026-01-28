import { IsBoolean } from 'class-validator'

export class ToggleAutomationDto {
    @IsBoolean()
    enabled: boolean
}
