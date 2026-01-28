export class PermissionPolicy {
    static can(required: string[], granted: string[]): boolean {
        if (!required.length) {
            return true
        }
        return required.every(permission => granted.includes(permission))
    }
}
