import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import { checkAuth } from '../middlewares/checkAuth';

const service = 'stock-item';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

router.get('/stock-item/mapStockTransaction', checkAuth, (req, res, next) => {
  const queryModel = req.query.queryModel || '{}';
  this.modelService.fetchAll(JSON.parse(queryModel)).then((result) => {
    const stockTransactionIds = result.data.map(item => item._id);
  });

});

export default router;
