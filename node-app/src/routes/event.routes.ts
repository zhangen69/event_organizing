import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';

const service = 'event';
const routes = new StandardRoutes(service, new Controller(service));
routes.bypass.getItemById = true;
const router = routes.router(express.Router());

router.post('/event/venue', (req, res, next) => {
    // check venue is exist or not
    // if existed then ignore
    // else then insert new record
});

router.get('/event/venues', (req, res, next) => {

});

export default router;
