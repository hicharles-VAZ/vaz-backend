import { PermissionsEnum } from '../../core/permissions/permissions.enum'

export const AssetsPermissions = [
    PermissionsEnum.ASSETS_VIEW,
    PermissionsEnum.ASSETS_CREATE,
    PermissionsEnum.ASSETS_UPDATE,
    PermissionsEnum.ASSETS_DELETE,
    PermissionsEnum.ASSETS_REPORT
] as const

export type AssetsPermission = (typeof AssetsPermissions)[number]
