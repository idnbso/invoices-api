import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { FilesService } from './infrastructure/files.service';
import { Invoice, InvoiceSchema } from './invoice/invoice.schema';
import { InvoiceService } from './invoice/invoice.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/gaviti'),
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }])
  ],
  controllers: [AppController],
  providers: [InvoiceService, FilesService]
})
export class AppModule { }
