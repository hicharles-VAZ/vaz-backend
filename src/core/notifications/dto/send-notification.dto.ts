import { IsString, IsArray } from 'class-validator'

export class SendNotificationDto {
    @IsString()
    channel: 'email' | 'teams'

    @IsArray()
    recipients: string[]

    @IsString()
    subject: string

    @IsString()
    message: string
}
