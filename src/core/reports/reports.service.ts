import { Injectable, BadRequestException } from '@nestjs/common'
import { PdfExporter } from './exporters/pdf.exporter'
import { ExcelExporter } from './exporters/excel.exporter'
import { CsvExporter } from './exporters/csv.exporter'

@Injectable()
export class ReportsService {
    constructor(
        private readonly pdfExporter: PdfExporter,
        private readonly excelExporter: ExcelExporter,
        private readonly csvExporter: CsvExporter
    ) {}

    async export(format: 'pdf' | 'excel' | 'csv', data: any[], filename: string) {
        if (format === 'pdf') {
            return this.pdfExporter.export(data, filename)
        }

        if (format === 'excel') {
            return this.excelExporter.export(data, filename)
        }

        if (format === 'csv') {
            return this.csvExporter.export(data, filename)
        }

        throw new BadRequestException()
    }
}
