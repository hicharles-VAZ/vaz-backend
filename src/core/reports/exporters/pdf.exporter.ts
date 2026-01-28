import { Injectable } from '@nestjs/common'
import PDFDocument from 'pdfkit'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

@Injectable()
export class PdfExporter {
    async export(data: any[], filename: string) {
        const id = randomUUID()
        const file = `${filename}-${id}.pdf`
        const path = join(process.cwd(), 'reports', file)

        const doc = new PDFDocument({ margin: 30 })
        const chunks: Buffer[] = []

        doc.on('data', chunk => chunks.push(chunk))
        doc.on('end', async () => {
            const buffer = Buffer.concat(chunks)
            await writeFile(path, buffer)
        })

        doc.fontSize(18).text(filename, { align: 'center' })
        doc.moveDown()

        data.forEach(item => {
            doc.fontSize(10).text(JSON.stringify(item, null, 2))
            doc.moveDown()
        })

        doc.end()

        return { file, path }
    }
}
