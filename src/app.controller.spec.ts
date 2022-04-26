import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { InvoiceService } from './invoice/invoice.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [InvoiceService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return results from fetchAll', () => {
    });
  });
});
