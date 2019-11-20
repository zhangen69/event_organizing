import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import configs from '../configs/app.configs';

// import routes
import attendanceRoutes from '../routes/attendance.routes';
import attendeeGroupRoutes from '../routes/attendee-group.routes';
import attendeeRoutes from '../routes/attendee.routes';
import categoryRoutes from '../routes/category.routes';
import customerRoutes from '../routes/customer.routes';
import eventPlanRoutes from '../routes/event-plan.routes';
import eventRoutes from '../routes/event.routes';
import invoiceRoutes from '../routes/invoice.routes';
import NgAppRoutes from '../routes/ng-app.routes';
import paymentVoucherRoutes from '../routes/payment-voucher.routes';
import paymentRoutes from '../routes/payment.routes';
import productRoutes from '../routes/product.routes';
import providerFacilityRoutes from '../routes/provider-facility.routes';
import providerServiceRoutes from '../routes/provider-service.routes';
import providerRoutes from '../routes/provider.routes';
import receiptRoutes from '../routes/receipt.routes';
// import registrationFormRoutes from '../routes/registration-form.routes';
import stockItemRoutes from '../routes/stock-item.routes';
import stockTransactionRoutes from '../routes/stock-transaction.routes';
import storeRoutes from '../routes/store.routes';
import supplierInvoiceRoutes from '../routes/supplier-invoice.routes';
import uploaderRoutes from '../routes/uploader.routes';
import userRoutes from '../routes/user.routes';
import quotationRoutes from '../routes/quotation.routes';
import { emailQueueCheckJob } from '../task_schedulers/email-queue.scheduler';

const router = express.Router();

router.use(helmet());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors());
router.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, '../logs.log'), { flags: 'a' }) }));

// apply uploader routes
router.use(uploaderRoutes);

// apply service routes
// const folderPath = path.join(__dirname, '../routes');
// fs.readdir(folderPath, (error, files) => {
//     files.forEach((file) => {
//         import(path.join(__dirname, '../routes', file)).then((module) => {
//             router.use('/service', module.default);
//         })
//     });
// });
router.use(
  '/service',
  productRoutes,
  eventPlanRoutes,
  eventRoutes,
  providerRoutes,
  stockTransactionRoutes,
  attendeeRoutes,
  attendeeGroupRoutes,
  attendanceRoutes,
  categoryRoutes,
  customerRoutes,
  invoiceRoutes,
  supplierInvoiceRoutes,
  paymentRoutes,
  paymentVoucherRoutes,
  stockItemRoutes,
  providerServiceRoutes,
  providerFacilityRoutes,
  receiptRoutes,
  // registrationFormRoutes,
  storeRoutes,
  quotationRoutes,
);
router.use('/service/user', userRoutes);

// apply ng-app routes, public folders
router.use(NgAppRoutes);

// Start: Task Schedulers
emailQueueCheckJob.triggeredJobs();

// mongodb connection
mongoose
  .connect(configs.mongoose.connection, { useNewUrlParser: true })
  .then((res: typeof mongoose) => {
    console.log('Connected to MongoDB!');
  })
  .catch((reason: any) => {
    console.log('Connection failed!', reason);
  });

export default router;
