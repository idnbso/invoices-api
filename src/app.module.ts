import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { Invoice, InvoiceSchema } from './invoice/invoice.schema';
import { InvoiceService } from './invoice/invoice.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/gaviti'),
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }])
  ],
  controllers: [AppController],
  providers: [InvoiceService],
})
export class AppModule { }
