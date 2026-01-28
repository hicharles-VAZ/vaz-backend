import { Injectable } from '@nestjs/common'
import { createObjectCsvWriter } from 'csv-writer'
import { join } from 'path'
import { randomUUID } from 'crypto'

@Injectable()
export class CsvExporter {
    async export(data: any[], filename: string) {
        const id = randomUUID()
        const file = `${filename}-${id}.csv`
        const path = join(process.cwd(), 'reports', file)

        const headers =
            data.length > 0
                ? Object.keys(data[0]).map(key => ({ id: key, title: key }))
                : []

        const writer = createObjectCsvWriter({
            path,
            header: headers
        })

        await writer.writeRecords(data)

        return { file, path }
    }
}
