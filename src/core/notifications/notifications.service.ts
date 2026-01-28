import { Injectable } from '@nestjs/common'
import { EmailChannel } from './channels/email.channel'
import { TeamsChannel } from './channels/teams.channel'
import { SendNotificationDto } from './dto/send-notification.dto'

@Injectable()
export class NotificationsService {
    constructor(
        private readonly emailChannel: EmailChannel,
        private readonly teamsChannel: TeamsChannel
    ) {}

    async send(dto: SendNotificationDto) {
        if (dto.channel === 'email') {
            return this.emailChannel.send(dto)
        }
        if (dto.channel === 'teams') {
            return this.teamsChannel.send(dto)
        }
        return { success: false }
    }
}
