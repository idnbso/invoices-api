import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type InvoiceDocument = Invoice & Document;

@Schema({ timestamps: true })
export class Invoice {
    @Prop()
    createdAt: Date

    @Prop()
    customerId: string;

    @Prop()
    invoiceId: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);