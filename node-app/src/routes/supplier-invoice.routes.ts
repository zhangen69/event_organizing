import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import { checkAuth } from '../middlewares/checkAuth';
import supplierInvoiceModel from '../models/supplier-invoice.model';

const service = 'supplier-invoice';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

router.get('/supplier-invoice/getByEventPlanId/:id', checkAuth, (req, res, next) => {
  supplierInvoiceModel.find({ eventPlan: req.params.id }).populate('provider').then((docs: any[]) => {
    res.status(200).json({
      data: docs,
    });
  });
});

export default router;
