const PathMaker = require('./helpers/PathMaker');

const MetrcSales = function (metrc) {
  const _metrc = metrc;
  const pathMaker = new PathMaker('/sales/v1/');

  const endpoint = ending => pathMaker.endpoint(ending);

  const customerTypes = () => _metrc.get(endpoint('customertypes'));

  const receipts = options => _metrc.get(endpoint('receipts'), options);

  const fetchReceipt = (id, options) => _metrc.get(endpoint(`receipts/${id}`), options);

  const createReceipt = payload => _metrc.post(endpoint('receipts'), payload);

  const updateReceipt = payload => _metrc.put(endpoint('receipts'), payload);

  const deleteReceipt = (id, options) => _metrc.delete(endpoint(`receipts/${id}`), options);

  const transactions = options => _metrc.get(endpoint('transactions'), options);

  const fetchTransaction = (date, options) => _metrc.get(endpoint(`transactions/${date}`), options);

  const createTransaction = (date, payload) => _metrc.post(endpoint(`transactions/${date}`), payload);

  const updateTransaction = (date, payload) => _metrc.put(endpoint(`transactions/${date}`), payload);

  return {
    customerTypes,
    receipts,
    fetchReceipt,
    createReceipt,
    updateReceipt,
    deleteReceipt,
    transactions,
    fetchTransaction,
    createTransaction,
    updateTransaction,
  };
};

module.exports = MetrcSales;
