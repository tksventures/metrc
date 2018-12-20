

const sinon = require('sinon');
const assert = require('assert');
const MetrcSales = require('../lib/MetrcSales');
const Metrc = require('../lib/Metrc');
const bulkHandler = require('../lib/helpers/bulkHandler');


describe('MetrcSales', () => {
  const metrc = new Metrc();
  const metrcSales = new MetrcSales(metrc);
  let mockMetrc;
  let mockBulkHandler;

  beforeEach(() => {
    mockMetrc = sinon.mock(metrc);
    mockBulkHandler = sinon.stub(bulkHandler, 'perform');
  });
  afterEach(() => {
    mockMetrc.restore();
    mockBulkHandler.restore();
  });

  it('gets customer types', (done) => {
    mockMetrc.expects('get')
      .withArgs('/sales/v1/customertypes')
      .resolves('OK');

    metrcSales.customerTypes().then(() => {
      mockMetrc.verify();
      done();
    });
  });

  describe('receipts', () => {
    const payload = {
      SalesDateTime: '2016-10-04T16:44:53.000',
      SalesCustomerType: 'Consumer',
      PatientLicenseNumber: null,
      CaregiverLicenseNumber: null,
      IdentificationMethod: null,
      Transactions: [
        {
          PackageLabel: 'ABCDEF012345670000010331',
          Quantity: 1.0,
          UnitOfMeasure: 'Ounces',
          TotalAmount: 9.99,
        },
        {
          PackageLabel: 'ABCDEF012345670000010332',
          Quantity: 1.0,
          UnitOfMeasure: 'Ounces',
          TotalAmount: 9.99,
        },
      ],
    };

    it('gets receipt data', (done) => {
      mockMetrc.expects('get')
        .withArgs('/sales/v1/receipts')
        .resolves('OK');

      metrcSales.receipts().then(() => {
        mockMetrc.verify();
        done();
      });
    });

    it('gets specified receipt data', (done) => {
      mockMetrc.expects('get')
        .withArgs('/sales/v1/receipts/1')
        .resolves('OK');

      metrcSales.fetchReceipt(1).then(() => {
        mockMetrc.verify();
        done();
      });
    });

    it('creates a sales receipt', (done) => {
      mockMetrc.expects('post')
        .withArgs('/sales/v1/receipts')
        .resolves('OK');

      metrcSales.createReceipt(payload).then(() => {
        mockMetrc.verify();
        done();
      });
    });

    it('updates a sales receipt', (done) => {
      mockMetrc.expects('put')
        .withArgs('/sales/v1/receipts')
        .resolves('OK');

      metrcSales.updateReceipt(payload).then(() => {
        mockMetrc.verify();
        done();
      });
    });

    it('delete a sales receipt', (done) => {
      mockMetrc.expects('delete')
        .withArgs('/sales/v1/receipts/1')
        .resolves('OK');

      metrcSales.deleteReceipt(1).then(() => {
        mockMetrc.verify();
        done();
      });
    });
  });

  describe('transactions', () => {
    const date = '2018-04-20';
    const payload = [
      {
        PackageLabel: 'ABCDEF012345670000010331',
        Quantity: 1.0,
        UnitOfMeasure: 'Ounces',
        TotalAmount: 9.99,
      },
      {
        PackageLabel: 'ABCDEF012345670000010332',
        Quantity: 1.0,
        UnitOfMeasure: 'Ounces',
        TotalAmount: 9.99,
      },
    ];

    it('gets transaction data', (done) => {
      mockMetrc.expects('get')
        .withArgs('/sales/v1/transactions')
        .resolves('OK');

      metrcSales.transactions().then(() => {
        mockMetrc.verify();
        done();
      });
    });

    it('gets specified transaction data', (done) => {
      mockMetrc.expects('get')
        .withArgs(`/sales/v1/transactions/${date}`)
        .resolves('OK');

      metrcSales.fetchTransaction(date).then(() => {
        mockMetrc.verify();
        done();
      });
    });

    it('creates a transaction', (done) => {
      mockMetrc.expects('post')
        .withArgs(`/sales/v1/transactions/${date}`)
        .resolves('OK');

      metrcSales.createTransaction(date, payload).then(() => {
        mockMetrc.verify();
        done();
      });
    });

    it('updates a transaction', (done) => {
      mockMetrc.expects('put')
        .withArgs(`/sales/v1/transactions/${date}`)
        .resolves('OK');

      metrcSales.updateTransaction(date, payload).then(() => {
        mockMetrc.verify();
        done();
      });
    });
  });
});
