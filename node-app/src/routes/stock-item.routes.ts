import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import { checkAuth } from '../middlewares/checkAuth';
import stockTransactionModel from '../models/stock-transaction.model';

const service = 'stock-item';
const modelService = new Controller(service);
const routes = new StandardRoutes(service, modelService);
const router = routes.router(express.Router());

router.get('/stock-item-with-qty', checkAuth, (req, res, next) => {
  const queryModel = req.query.queryModel || '{}';
  modelService.fetchAll(JSON.parse(queryModel)).then((result: any) => {
    const stockTransactionIds = result.data.map(item => item._id);
    stockTransactionModel.find({ stockItem: { $in: stockTransactionIds } }).then((docs: any[]) => {
      result.data = result.data
        .map(item => item.toObject())
        .map(item => {
          const totalStockOut = docs
            .filter(transaction => transaction.type === 'StockOut' && item._id.toString() === transaction.stockItem.toString())
            .reduce((acc, transaction) => acc + transaction.quantity, 0);
          const totalStockIn = docs
            .filter(transaction => transaction.type === 'StockIn' && item._id.toString() === transaction.stockItem.toString())
            .reduce((acc, transaction) => acc + transaction.quantity, 0);
          item['quantity'] = totalStockIn - totalStockOut || 0;
          return item;
        });
      res.status(200).json(result);
    });
  });
});

router.get('/stock-item-with-qty/:id', checkAuth, (req, res, next) => {
  modelService.fetch(req.params.id, req.query).then((result: any) => {
    result.data = result.data.toObject();
    stockTransactionModel.find({ stockItem: result.data._id }).then((docs: any[]) => {
      const totalStockOut = docs
        .filter(transaction => transaction.type === 'StockOut')
        .reduce((acc, transaction) => acc + transaction.quantity, 0);
      const totalStockIn = docs
        .filter(transaction => transaction.type === 'StockIn')
        .reduce((acc, transaction) => acc + transaction.quantity, 0);
      result.data.quantity = totalStockIn - totalStockOut || 0;
      res.status(200).json(result);
    });
  });
});

export default router;
