import express from 'express';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';
import eventPlanModel from '../models/event-plan.model';
import { checkAuth } from '../middlewares/checkAuth';
import { from } from 'rxjs';
import { map, distinct } from 'rxjs/operators';
import appConfigs from '../configs/app.configs';
import emailQueueModel from '../models/email-queue.model';

const service = 'event-plan';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

router.get('/event-plan/venue/list', checkAuth, (req, res, next) => {
  eventPlanModel.find({ venue: { $exists: true, $ne: null } }).then((docs) => {
    const results = [];
    from(docs)
      .pipe(
        map((doc) => doc['venue']),
        distinct(),
      )
      .subscribe({
        next: (result) => results.push(result),
        complete: () => res.status(200).json({ data: results })
      });
  });
});

router.post(`/${service}/sendRegistrationFormLink`, checkAuth, (req, res, next) => {
  const mailTemplate = `
            <h1>Registration Form</h1>
            <p>Please click <a href="http://localhost:4200/register/${req.body.formId}">Here</a> to register your seat.</p>
            <p>Check it out.</p>
        `;

  const emailQueue = new emailQueueModel({
    to: req.body.email,
    from: `EvtOrgMs <${appConfigs.mailAuth.user}>`,
    subject: `Event Registration Form`,
    message: mailTemplate,
  });

  emailQueue.save().then(() => {
    res.status(200).json({ succeeded: true, message: 'Email sent.' });
  });
});

router.get(`/${service}/getRegistrationForm/:id`, (req, res, next) => {
  eventPlanModel.findById(req.params.id).then((doc) => {
    const event = {
        _id: doc['_id'],
        name: doc['name'],
        venue: doc['venue'],
        dateFrom: doc['dateFrom'],
        timeFrom: doc['timeFrom'],
        dateTo: doc['dateTo'],
        timeTo: doc['timeTo'],
    };
    const form = doc['registrationForm'];

    if (form) {
      res.status(200).json({ form, event });
    } else {
      res.status(500).json({ message: 'form not found' });
    }
  });
});

router.post(`/${service}/attendee-register`, (req, res, next) => {
    // console.log(req.body);
    // res.status(200).json({ message: 'ok' });
    eventPlanModel.findById(req.body.event).then((doc) => {
      const attendees = doc['attendees'];
      const newAttendee: any = {
        formData: req.body.formData || {},
      };
      if (req.body.name) {
        newAttendee.name = req.body.name;
      }
      if (req.body.identityNumber) {
        newAttendee.identityNumber = req.body.identityNumber;
      }
      if (req.body.email) {
        newAttendee.email = req.body.email;
      }
      if (req.body.address) {
        newAttendee.address = req.body.address;
      }
      if (req.body.phoneNumber) {
        newAttendee.phoneNumber = req.body.phoneNumber;
      }
      if (req.body.organization) {
        newAttendee.organization = req.body.organization;
      }
      if (req.body.gender) {
        newAttendee.gender = req.body.gender;
      }
      attendees.push(newAttendee);
      doc.save().then(() => {
        res.status(200).json({ message: 'ok' });
      });
    });
});

export default router;
