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
    const mailOptions = {
        from: `EvtOrgMs <${auth.user}>`, // sender address
        to: 'zhangen69@gmail.com', // req.body.to, // list of receivers
        subject: 'test mail', // req.body.subject, // Subject line
        text: 'test mail body', // req.body.body, // plain text body
        html: '<b>NodeJS Email Tutorial</b>', // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        // res.render('index');
        res.status(200).json({ message: 'successfully sent' });
    });
});

export default router;
