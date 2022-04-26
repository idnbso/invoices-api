import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InvoiceDTO } from "./invoice.dto";
import { Invoice, InvoiceDocument } from "./invoice.schema";
import { parse } from "json2csv";
import * as fs from 'fs';
import { promisify } from 'util';

@Injectable()
export class InvoiceService {

    constructor(@InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>) { }

    async readAll(): Promise<InvoiceDTO[]> {
        const invoices = await this.invoiceModel.find().exec();
        const dtos: InvoiceDTO[] = invoices.map(invoice => {
            return {
                createdAt: invoice.createdAt,
                customerId: invoice.customerId,
                invoiceId: invoice.invoiceId
            }
        });

        return dtos;
    }

    async readAllToCSV(): Promise<void> {
        const invoiceFields = [
            {
                label: 'Created At',
                value: 'createdAt'
            },
            {
                label: 'Customer Id',
                value: 'customerId'
            },
            {
                label: 'Invoice Id',
                value: 'invoiceId'
            }
        ];

        const invoices = await this.readAll();

        const csv: string = parse(invoices, { fields: invoiceFields });
        const filePath = 'public';
        const fileName = 'invoices.csv';

        await this.createFile(filePath, fileName, csv);
    }

    async createFile(path: string, fileName: string, data: string): Promise<void> {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }

        const writeFile = promisify(fs.writeFile);

        return await writeFile(`${path}/${fileName}`, data, 'utf8');
    }
}
