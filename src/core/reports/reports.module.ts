import { Module } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { PdfExporter } from './exporters/pdf.exporter'
import { ExcelExporter } from './exporters/excel.exporter'
import { CsvExporter } from './exporters/csv.exporter'

@Module({
    providers: [ReportsService, PdfExporter, ExcelExporter, CsvExporter],
    exports: [ReportsService]
})
export class ReportsModule {}
