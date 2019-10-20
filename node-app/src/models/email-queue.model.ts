import { MongooseHelper } from './../helpers/mongoose.helper';
import mongoose from 'mongoose';

const EmailQueueSchema = new mongoose.Schema({
    to: MongooseHelper.Types.String(),
    from: MongooseHelper.Types.String(),
    subject: MongooseHelper.Types.String(),
    message: MongooseHelper.Types.String(),
    isSent: MongooseHelper.Types.Boolean(),
    sentDate: MongooseHelper.Types.Date(null),
    errorMessage: MongooseHelper.Types.String(),
    lastSendDate: MongooseHelper.Types.Date(null),
});

export default mongoose.model('EmailQueue', EmailQueueSchema);
