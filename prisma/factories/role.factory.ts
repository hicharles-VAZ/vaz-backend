import { PrismaClient } from '@prisma/client'
import { PermissionsEnum } from '../../src/core/permissions/permissions.enum'

export async function seedRoles(prisma: PrismaClient) {
    const permissions = Object.values(PermissionsEnum)

    for (const name of permissions) {
        await prisma.permission.upsert({
            where: { name },
            update: {},
            create: {
                name,
                description: name
            }
        })
    }

    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'admin',
            description: 'Administrador'
        }
    })

    const allPermissions = await prisma.permission.findMany()

    await prisma.role.update({
        where: { id: adminRole.id },
        data: {
            permissions: {
                set: allPermissions.map(p => ({ id: p.id }))
            }
        }
    })
}
