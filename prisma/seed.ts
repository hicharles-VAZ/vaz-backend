import { PrismaClient } from '@prisma/client'
import { seedRoles } from './factories/role.factory'
import { seedSectors } from './factories/sector.factory'
import { seedUsers } from './factories/user.factory'

const prisma = new PrismaClient()

async function main() {
    await seedRoles(prisma)
    await seedSectors(prisma)
    await seedUsers(prisma)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async () => {
        await prisma.$disconnect()
        process.exit(1)
    })
