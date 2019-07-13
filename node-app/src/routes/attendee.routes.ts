import axios from 'axios';
import express from 'express';
import fs from 'fs';
import nodeMailer from 'nodemailer';
import QRCode from 'qrcode';
import { forkJoin, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import appConfigs from '../configs/app.configs';
import Controller from '../standards/controller';
import StandardRoutes from '../standards/routes';

const service = 'attendee';
const controller = new Controller(service);
const routes = new StandardRoutes(service, controller);
routes.bypass.create = true;
const router = routes.router(express.Router());

router.post(`/${service}/register`, (req, res, next) => {
    let attendee: { name: any; code: string | QRCode.QRCodeSegment[]; email: any; event: string; };

    const sendEmail = ([event, qrcode]) => {
        console.log('sending email...');

        const transporter = nodeMailer.createTransport(appConfigs.mail);
        const mailTemplate = `
            <h1>Congradulations!</h1>
            <p>Dear ${attendee.name},</p>
            <p>We're appriaciate you registered the event, here are your pass code</p>
            <h3>${attendee.code}</h3>
            <p>We are looking foward your attend, thank you.</p>
        `;

        const tempFilename = 'out.png';
        const base64Data = qrcode.replace(/^data:image\/png;base64,/, '');
        fs.writeFileSync(tempFilename, base64Data, 'base64');

        const mailOptions = {
            from: `EvtOrgMs <${appConfigs.mailAuth.user}>`,
            to: attendee.email,
            subject: `Event Register Confirmation: ${event.name}`,
            html: mailTemplate,
            attachments: [
                {
                    filename: `${event.name}-qrcode.png`,
                    content: fs.createReadStream(tempFilename),
                },
            ],
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            fs.unlinkSync(tempFilename);
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.status(200).json({ succeeded: true, message: 'Email sent.', data: attendee });
        });
    };

    const createAttendee = from(axios.post('http://localhost:3000/service/attendee', req.body));

    // createAttendee > qrcode > getEventInfo
    const process = createAttendee.pipe(
        map((res) => (attendee = res.data.data)),
        mergeMap(() => {
            const getEvent = from(axios.get('http://localhost:3000/service/event/' + attendee.event)).pipe(map((res) => res.data.data));
            const generateQRCode = from(QRCode.toDataURL(attendee.code, { errorCorrectionLevel: 'H', type: 'image/png' }));
            return forkJoin([getEvent, generateQRCode]);
        }),
    );

    process.subscribe(
        (results: any) => {
            console.log('qrcode and event is gotcha!');
            if (attendee.email) {
                sendEmail(results);
            }
        },
        (err) => {
            console.log('error');
            console.log(err);
        },
    );
});

export default router;
