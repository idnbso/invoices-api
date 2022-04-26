import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { stringify } from 'querystring';
import { InvoiceDTO } from './invoice/invoice.dto';
import { InvoiceService } from './invoice/invoice.service';

@Controller()
export class AppController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Get()
  async fetchAll(@Res() response) {
    const invoices = await this.invoiceService.readAll();
    const dtos: InvoiceDTO[] = invoices.map(invoice => {
      return {
        createdAt: invoice.createdAt,
        customerId: invoice.customerId,
        invoiceId: invoice.invoiceId
      }
    });
    return response.status(HttpStatus.OK).json({
      invoices: dtos
    })
  }
}
