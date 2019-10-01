import { from } from 'rxjs';
import { distinct, map } from 'rxjs/operators';
import Controller from '../standards/controller';
import eventModel from '../models/event.model';
import express from 'express';
import StandardRoutes from '../standards/routes';

const service = 'event';
const routes = new StandardRoutes(service, new Controller(service));
routes.bypass.getItemById = true;
const router = routes.router(express.Router());

router.get('/event/venues/:keyword', (req, res, next) => {
    eventModel.find({
        venue: new RegExp(`${req.params.keyword}`, 'gi'),
    }).then((docs) => {
        const results = [];
        from(docs).pipe(
            map((doc) => doc['venue']),
            distinct(),
        ).subscribe({
            next: (result) => results.push(result),
            complete: () => res.status(200).json(results),
        });
    });
});

export default router;
