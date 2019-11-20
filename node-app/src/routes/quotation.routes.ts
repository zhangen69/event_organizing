import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import { checkAuth } from '../middlewares/checkAuth';
import quotationModel from '../models/quotation.model';

const service = 'quotation';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

router.get('/quotation/getByEventPlanId/:id', checkAuth, (req, res, next) => {
  if (req.params.id) {
    quotationModel
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
