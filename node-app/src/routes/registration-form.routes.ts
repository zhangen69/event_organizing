import express from 'express';
import nodeMailer from 'nodemailer';
import appConfigs from '../configs/app.configs';
import { checkAuth } from '../middlewares/checkAuth';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';

const service = 'registration-form';
const routes = new StandardRoutes(service, new Controller(service));
routes.bypass.getItemById = true;
const router = routes.router(express.Router());

router.post(`/${service}/sendRegistrationFormLink`, checkAuth, (req, res, next) => {
    console.log('sending email...');

    const transporter = nodeMailer.createTransport(appConfigs.mail);
    const mailTemplate = `
            <h1>Registration Form</h1>
            <p>Here is the registration form link: http://localhost:4200/register/${req.body.formId}</p>
            <p>Check it out.</p>
        `;

    const mailOptions = {
        from: `EvtOrgMs <${appConfigs.mailAuth.user}>`,
        to: req.body.email,
        subject: `Event Registration Form`,
        html: mailTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.status(200).json({ succeeded: true, message: 'Email sent.' });
    });
});

export default router;
