import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import { checkAuth } from '../middlewares/checkAuth';
import paymentModel from '../models/payment.model';

const service = 'payment';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

router.get('/' + service + '/getByEventPlanId/:id', checkAuth, (req, res, next) => {
  paymentModel.find({ eventPlan: req.params.id }).populate('provider').populate('supplierInvoice').then((docs: any[]) => {
    res.status(200).json({
      data: docs,
    });
  });
});

export default router;
