import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import { checkAuth } from '../middlewares/checkAuth';
import paymentVoucherModel from '../models/payment-voucher.model';

const service = 'payment-voucher';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

router.get('/' + service + '/getByEventPlanId/:id', checkAuth, (req, res, next) => {
  paymentVoucherModel.find({ eventPlan: req.params.id }).populate('provider').then((docs: any[]) => {
    res.status(200).json({
      data: docs,
    });
  });
});

export default router;
