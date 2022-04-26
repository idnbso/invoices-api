import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { stringify } from 'querystring';
import { InvoiceDTO } from './invoice/invoice.dto';
import { InvoiceService } from './invoice/invoice.service';

@Controller()
export class AppController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Get('invoices')
  async fetchAllInvoices(@Res() response) {
    const invoices: InvoiceDTO[] = await this.invoiceService.readAll();
    
    return response.status(HttpStatus.OK).json({
      invoices
    })
  }

  @Get('invoices/csv')
  async getAllInvoicesCSV(@Res() res) {
    await this.invoiceService.readAllToCSV();

    return res.sendFile('invoices.csv', { root: './public' });
  }
}
