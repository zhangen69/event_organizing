import { scheduleJob } from 'node-schedule';
import emailQueueModel from '../models/email-queue.model';
import nodeMailer from 'nodemailer';
import appConfigs from '../configs/app.configs';
import { Document } from 'mongoose';
import { of, from } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';

const sendEmail = (emailQueue: Document): any => {
  console.log('sending email...');

  const transporter = nodeMailer.createTransport(appConfigs.mail);

  const mailOptions = {
    from: emailQueue['from'],
    to: emailQueue['to'],
    subject: emailQueue['subject'],
    html: emailQueue['message'],
  };

  transporter.sendMail(mailOptions, (error: Error, info) => {
      if (error) {
        emailQueue['errorMessage'] = JSON.stringify(error);
        emailQueue['lastSendDate'] = new Date();
        emailQueue.save();
        return { succeeded: false, message: error };
      } else {
        emailQueue['isSent'] = true;
        emailQueue['sentDate'] = new Date();
        emailQueue['lastSendDate'] = new Date();
        emailQueue.save();
        return { succeeded: true, message: 'Sent Email Successfully' };
      }
  });
};

export const emailQueueCheckJob = scheduleJob('5 * * * *', () => {
  console.log('Email Queue Check is runnning in every 5 minutes');
  emailQueueModel.find({ isSent: false }).then((docs: Document[]) => {
    if (docs && docs.length > 0) {
      const observerables = docs.map((doc: Document) => of(doc).pipe(
        tap((doc) => sendEmail(doc)),
      ));

      from(observerables).pipe(
        concatMap((obs) => obs),
      ).subscribe({
        complete: () => {
          console.log(new Date(), 'All emails are sent');
        },
      });
    } else {
      console.log(new Date(), 'No email queue is pending');
    }
  });
});
