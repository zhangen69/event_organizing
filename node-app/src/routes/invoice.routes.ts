import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import { checkAuth } from '../middlewares/checkAuth';
import invoiceModel from '../models/invoice.model';

const service = 'invoice';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

router.get('/invoice/getByEventPlanId/:id', checkAuth, (req, res, next) => {
  if (req.params.id) {
    invoiceModel
      .findOne({ eventPlan: req.params.id })
      .populate('customer')
      .then(doc => {
        res.status(200).json({
          data: doc
        });
      });
  }
});

export default router;
