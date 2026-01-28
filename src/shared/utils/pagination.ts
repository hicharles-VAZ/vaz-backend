export function paginate<T>(
    data: T[],
    page: number = 1,
    limit: number = 10
): { items: T[]; total: number; page: number; limit: number } {
    const total = data.length
    const start = (page - 1) * limit
    const end = start + limit

    return {
        items: data.slice(start, end),
        total,
        page,
        limit
    }
}
