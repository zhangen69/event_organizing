import { from } from 'rxjs';
import { distinct, map } from 'rxjs/operators';
import Controller from '../standards/controller';
import eventModel from '../models/event.model';
import express from 'express';
import StandardRoutes from '../standards/routes';
import { checkAuth } from '../middlewares/checkAuth';

const service = 'event';
const routes = new StandardRoutes(service, new Controller(service));
routes.bypass.getItemById = true;
const router = routes.router(express.Router());

router.get('/event/venue/list', checkAuth, (req, res, next) => {
    eventModel.find({ venue: { $exists: true, $ne: null } }).then((docs) => {
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
