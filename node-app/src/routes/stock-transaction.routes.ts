import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import { checkAuth } from '../middlewares/checkAuth';
import stockItemModel from '../models/stock-item.model';
import stockTransactionModel from '../models/stock-transaction.model';

const service = 'stock-transaction';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

router.get('/stock-transaction/getQuantityInStock/:stockItemId', checkAuth, (req, res, next) => {
  stockItemModel.findById(req.params.stockItemId).then(doc => {
    stockTransactionModel.find({ stockItem: doc._id }).then((docs: any[]) => {
      let quantity = 0;
      const totalStockIn = docs.filter(item => item.type === 'StockIn').reduce((acc, item) => acc + item.quantity, 0);
      const totalStockOut = docs.filter(item => item.type === 'StockOut').reduce((acc, item) => acc + item.quantity, 0);

      quantity = totalStockIn - totalStockOut;

      res.json({
        stockItem: doc,
        quantity,
      });
    });
  });
});

export default router;
