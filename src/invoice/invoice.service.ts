import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Invoice, InvoiceDocument } from "./invoice.schema";

@Injectable()
export class InvoiceService {

    constructor(@InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>) { }

    async readAll(): Promise<Invoice[]> {
        return await this.invoiceModel.find().exec();
    }
}
