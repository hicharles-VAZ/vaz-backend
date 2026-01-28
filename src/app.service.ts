import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getInfo() {
        return {
            name: 'Vaz Desenvolvimento Platform',
            status: 'running'
        }
    }
}
