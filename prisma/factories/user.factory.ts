import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

export async function seedUsers(prisma: PrismaClient) {
    const password = await bcrypt.hash('Trabalho01', 10)

    await prisma.user.upsert({
        where: { email: 'hicharles.rocha@vazdesenvolvimento.com.br' },
        update: {},
        create: {
            email: 'hicharles.rocha@vazdesenvolvimento.com.br',
            password,
            name: 'Administrador',
            active: true
        }
    })
}
