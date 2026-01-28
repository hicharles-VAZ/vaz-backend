import { PrismaClient } from '@prisma/client'

export async function seedSectors(prisma: PrismaClient) {
    const sectors = [
        { name: 'Administrativo', description: 'Setor administrativo' },
        { name: 'Financeiro', description: 'Setor financeiro' },
        { name: 'Operacional', description: 'Setor operacional' }
    ]

    for (const sector of sectors) {
        await prisma.sector.upsert({
            where: { name: sector.name },
            update: {},
            create: sector
        })
    }
}
