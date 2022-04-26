import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { FilesService } from './infrastructure/files.service';
import { InvoiceService } from './invoice/invoice.service';

class InvoiceModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static readAll = jest.fn().mockResolvedValue([]);
}

describe('AppController', () => {
  let appController: AppController;
  let invoiceService: InvoiceService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        InvoiceService, FilesService,
        {
          provide: getModelToken('Invoice'),
          useValue: InvoiceModel
        }
      ]
    }).compile();

    invoiceService = app.get<InvoiceService>(InvoiceService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return results from fetchAll', () => {
      // const result = [{ createdAt: 123, customerId: '1', invoiceId: '' }];
      // jest.spyOn(invoiceService, 'readAll').mockImplementation(() => result);

      // expect(await appController.fetchAllInvoices()).toBe(result);
    });
  });
});
