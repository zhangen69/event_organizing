import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';

const service = 'event';
const routes = new StandardRoutes(service, new Controller(service));
routes.bypass.getItemById = true;
const router = routes.router(express.Router());

export default router;
