import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import eventPlanModel from '../models/event-plan.model';
import { checkAuth } from '../middlewares/checkAuth';
import { from } from 'rxjs';
import { map, distinct } from 'rxjs/operators';
import nodeMailer from 'nodemailer';
import appConfigs from '../configs/app.configs';
import emailQueueModel from '../models/email-queue.model';

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

router.post(`/${service}/sendRegistrationFormLink`, checkAuth, (req, res, next) => {
    // console.log('sending email...');

    // const transporter = nodeMailer.createTransport(appConfigs.mail);
    const mailTemplate = `
            <h1>Registration Form</h1>
            <p>Please click <a href="http://localhost:4200/register/${req.body.formId}">Here</a> to register your seat.</p>
            <p>Check it out.</p>
        `;

    // const mailOptions = {
    //     from: `EvtOrgMs <${appConfigs.mailAuth.user}>`,
    //     to: req.body.email,
    //     subject: `Event Registration Form`,
    //     html: mailTemplate,
    // };

    const emailQueue = new emailQueueModel({
        to: req.body.email,
        from: `EvtOrgMs <${appConfigs.mailAuth.user}>`,
        subject: `Event Registration Form`,
        message: mailTemplate,
    });

    emailQueue.save().then(() => {
        res.status(200).json({ succeeded: true, message: 'Email sent.' });
    });

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    //     res.status(200).json({ succeeded: true, message: 'Email sent.' });
    // });
});

export default router;
