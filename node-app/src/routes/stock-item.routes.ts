import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';

const service = 'stock-item';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

export default router;
