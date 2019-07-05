import express from 'express';
import nodeMailer from 'nodemailer';
import request from 'request';
import appConfigs from '../configs/app.configs';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';

const service = 'attendee';
const controller = new Controller(service);
const routes = new StandardRoutes(service, controller);
routes.bypass.create = true;
const router = routes.router(express.Router());

// router.post(`/${service}/sendEmail`, (req, res, next) => {
//     console.log('sending email...');
//     const transporter = nodeMailer.createTransport(appConfigs.mail);
//     const mailTemplate = `
//         <h1>Congradulations!</h1>
//         <p>Dear ${req.body.name},</p>
//         <p>We're appriaciate you registered the event, here are your pass code</p>
//         <h3>${req.body.code}</h3>
//         <p>We are looking foward your attend, thank you.</p>
//     `;
//     const mailOptions = {
//         from: `EvtOrgMs <${appConfigs.mailAuth.user}>`,
//         to: req.body.email,
//         subject: `Event Register Confirmation: ${req.body.eventName}`,
//         html: mailTemplate,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//         // res.render('index');
//         res.status(200).json({ message: 'successfully sent', suceeded: true });
//     });
// });

router.post(`/${service}/register`, (req, res, next) => {
    request.post('http://localhost:3000/service/attendee', req.body, (error, res, body) => {
        console.log('executed..');
        console.log('sending email...');
    });
});

export default router;
