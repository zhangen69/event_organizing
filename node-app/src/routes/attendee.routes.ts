import express from 'express';
import nodeMailer from 'nodemailer';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';

const service = 'attendee';
const routes = new StandardRoutes(service, new Controller(service));
const router = routes.router(express.Router());

router.post(`/${service}/sendEmail`, (req, res, next) => {
    console.log('sending email...');
    const auth = {
        user: 'noreply.evtorgms@gmail.com',
        pass: 'evtorgms123',
    };
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth,
    });
    const mailTemplate = `
        <h1>Congradulations!</h1>
        <p>Dear ${req.body.name},</p>
        <p>We're appriaciate you registered the event, here are your pass code</p>
        <h3>${req.body.code}</h3>
        <p>We are looking foward your attend, thank you.</p>
    `;
    const mailOptions = {
        from: `EvtOrgMs <${auth.user}>`,
        to: req.body.email,
        subject: `Event Register Confirmation: ${req.body.eventName}`,
        html: mailTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        // res.render('index');
        res.status(200).json({ message: 'successfully sent', suceeded: true });
    });
});

export default router;
