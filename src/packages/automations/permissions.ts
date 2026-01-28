import { PermissionsEnum } from '../../core/permissions/permissions.enum'

export const AutomationsPermissions = [
    PermissionsEnum.AUTOMATIONS_VIEW,
    PermissionsEnum.AUTOMATIONS_CHANGE_STATUS,
    PermissionsEnum.AUTOMATIONS_NOTIFICATIONS,
    PermissionsEnum.AUTOMATIONS_CRON
] as const

export type AutomationsPermission = (typeof AutomationsPermissions)[number]
