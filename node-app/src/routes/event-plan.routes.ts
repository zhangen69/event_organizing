import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import eventPlanModel from '../models/event-plan.model';
import { checkAuth } from '../middlewares/checkAuth';
import { from } from 'rxjs';
import { map, distinct } from 'rxjs/operators';

const service = 'event-plan';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

router.get('/event-plan/venue/list', checkAuth, (req, res, next) => {
    eventPlanModel.find({ venue: { $exists: true, $ne: null } }).then((docs) => {
        const results = [];
        from(docs).pipe(
            map((doc) => doc['venue']),
            distinct(),
        ).subscribe({
            next: (result) => results.push(result),
            complete: () => res.status(200).json({ data: results }),
        });
    });
});

export default router;
