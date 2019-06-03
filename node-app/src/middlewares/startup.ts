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
import providerRoutes from '../routes/event-plan.routes';
import eventPlanRoutes from '../routes/event-plan.routes';
import stockTransactionRoutes from '../routes/event-plan.routes';
import attendeeRoutes from '../routes/event-plan.routes';
import attendeeGroupRoutes from '../routes/event-plan.routes';
import attendanceRoutes from '../routes/event-plan.routes';
import categoryRoutes from '../routes/event-plan.routes';
import customerRoutes from '../routes/event-plan.routes';
import invoiceRoutes from '../routes/event-plan.routes';
import supplierInvoiceRoutes from '../routes/event-plan.routes';
import paymentRoutes from '../routes/event-plan.routes';
import paymentVoucherRoutes from '../routes/event-plan.routes';
import stockItemRoutes from '../routes/event-plan.routes';
import providerServiceRoutes from '../routes/event-plan.routes';
import providerFacilityRoutes from '../routes/event-plan.routes';
import receiptRoutes from '../routes/event-plan.routes';
import registrationFormRoutes from '../routes/event-plan.routes';
import storeRoutes from '../routes/event-plan.routes';
import eventRoutes from '../routes/event.routes';
import NgAppRoutes from '../routes/ng-app.routes';
import productRoutes from '../routes/product.routes';
import uploaderRoutes from '../routes/uploader.routes';
import userRoutes from '../routes/user.routes';

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
router.use('/service', productRoutes, eventPlanRoutes, eventRoutes, providerRoutes, stockTransactionRoutes, attendeeRoutes, attendeeGroupRoutes, attendanceRoutes, categoryRoutes, customerRoutes, invoiceRoutes, supplierInvoiceRoutes, paymentRoutes, paymentVoucherRoutes, stockItemRoutes, providerServiceRoutes, providerFacilityRoutes, receiptRoutes, registrationFormRoutes, storeRoutes);
router.use('/service/user', userRoutes);

// apply ng-app routes, public folders
router.use(NgAppRoutes);

// mongodb connection
mongoose.connect(configs.mongoose.connection, { useNewUrlParser: true })
    .then((res: typeof mongoose) => { console.log('Connected to MongoDB!'); })
    .catch((reason: any) => { console.log('Connection failed!', reason); });

export default router;
