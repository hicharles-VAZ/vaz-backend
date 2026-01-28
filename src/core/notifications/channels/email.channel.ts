import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client } from '@microsoft/microsoft-graph-client'
import { ConfidentialClientApplication } from '@azure/msal-node'
import 'isomorphic-fetch'
import { SendNotificationDto } from '../dto/send-notification.dto'

@Injectable()
export class EmailChannel {
    constructor(private readonly configService: ConfigService) {}

    private async getAccessToken(): Promise<string> {
        const tenantId = this.configService.get<string>('notifications.teams.tenantId')
        const clientId = this.configService.get<string>('notifications.teams.clientId')
        const clientSecret = this.configService.get<string>('notifications.teams.clientSecret')

        const app = new ConfidentialClientApplication({
            auth: {
                clientId,
                authority: `https://login.microsoftonline.com/${tenantId}`,
                clientSecret
            }
        })

        const result = await app.acquireTokenByClientCredential({
            scopes: ['https://graph.microsoft.com/.default']
        })

        if (!result?.accessToken) {
            throw new InternalServerErrorException()
        }

        return result.accessToken
    }

    async send(dto: SendNotificationDto) {
        const token = await this.getAccessToken()

        const client = Client.init({
            authProvider: done => {
                done(null, token)
            }
        })

        const sender = this.configService.get<string>('SMTP_USER')

        const toRecipients = dto.recipients.map(email => ({
            emailAddress: { address: email }
        }))

        await client.api(`/users/${sender}/sendMail`).post({
            message: {
                subject: dto.subject,
                body: {
                    contentType: 'HTML',
                    content: dto.message
                },
                toRecipients
            },
            saveToSentItems: true
        })

        return { success: true }
    }
}
