import { Injectable } from '@nestjs/common'
import { Workbook } from 'exceljs'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

@Injectable()
export class ExcelExporter {
    async export(data: any[], filename: string) {
        const id = randomUUID()
        const file = `${filename}-${id}.xlsx`
        const path = join(process.cwd(), 'reports', file)

        const workbook = new Workbook()
        const sheet = workbook.addWorksheet('Report')

        if (data.length > 0) {
            const columns = Object.keys(data[0]).map(key => ({ header: key, key }))
            sheet.columns = columns
            data.forEach(item => {
                sheet.addRow(item)
            })
        }

        const buffer = await workbook.xlsx.writeBuffer()
        await writeFile(path, Buffer.from(buffer))

        return { file, path }
    }
}
