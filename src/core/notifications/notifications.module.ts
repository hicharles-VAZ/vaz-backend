import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { EmailChannel } from './channels/email.channel'
import { TeamsChannel } from './channels/teams.channel'

@Module({
    providers: [NotificationsService, EmailChannel, TeamsChannel],
    exports: [NotificationsService]
})
export class NotificationsModule {}
