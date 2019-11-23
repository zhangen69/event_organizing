import { MongooseHelper } from './../helpers/mongoose.helper';
import mongoose from 'mongoose';
import auditable from './auditable.model';
import Counter from './counter.model';

const ChequeSchema = new mongoose.Schema({
  referenceNumber: MongooseHelper.Types.String(),
  payeeName: MongooseHelper.Types.String(),
  payeeIdentityNumber: MongooseHelper.Types.String(),
  draweeName: MongooseHelper.Types.String(),
  draweeIdentityNumber: MongooseHelper.Types.String(),
  issuedDate: MongooseHelper.Types.Date(),
});

const BankTransferSchema = new mongoose.Schema({
  referenceNumber: MongooseHelper.Types.String(),
  bank: MongooseHelper.Types.String(),
  accountNumber: MongooseHelper.Types.String(),
  payeeName: MongooseHelper.Types.String(),
  payeeIdentityNumber: MongooseHelper.Types.String(),
  transferedDate: MongooseHelper.Types.Date(),
});

const PaymentSchema = new mongoose.Schema({
  code: MongooseHelper.Types.String(),
  type: MongooseHelper.Types.Enum(['Customer', 'Provider']),
  // name: String,
  // attendee: { type: mongoose.Types.ObjectId, ref: 'Attendee' },
  eventPlan: { type: mongoose.Types.ObjectId, ref: 'EventPlan' },
  supplierInvoice: MongooseHelper.Types.RefObjectId('SupplierInvoice'),
  invoice: MongooseHelper.Types.RefObjectId('Invoice'),
  provider: MongooseHelper.Types.RefObjectId('Provider'),
  customer: MongooseHelper.Types.RefObjectId('Customer'),
  // registrationForm: { type: mongoose.Types.ObjectId, ref: 'RegistrationForm' },
  // unit: String,
  // unitPrice: Number,
  // quantity: Number,
  amount: MongooseHelper.Types.Number(),
  paymentType: { type: String, enum: ['Cash', 'BankTransfer', 'Cheque'], default: 'Cash' },
  status: { type: String, enum: ['Open', 'Verified', 'Cancelled', 'Failed', 'Closed'] },
  remarks: String,
  chequeInfo: MongooseHelper.Types.Schema(ChequeSchema),
  bankTransferInfo: MongooseHelper.Types.Schema(BankTransferSchema),
});

PaymentSchema.add(auditable);

PaymentSchema.pre('save', function(next) {
  console.log('pre:save');
  const item = this;
  const query = Counter.findOne({ domain: 'Payment' });
  query.then(doc => {
    const str = '000';
    const code = 'PAY';
    if (!doc) {
      console.log('create new counter: Payment');
      const newCounter = new Counter({ domain: 'Payment', serial: 1 });
      const saveQuery = newCounter.save();
      saveQuery.then(newDoc => {
        const docSerial = newDoc.get('serial');
        console.log('newDoc.serial.length', docSerial.toString().length);
        const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
        item.set('code', `${code}-${serialnumber}`);
        next();
      });
    } else {
      console.log('update serial: Payment');
      doc.set('serial', doc.get('serial') + 1);
      const updateQuery = doc.save();
      updateQuery.then(updatedDoc => {
        const docSerial = updatedDoc.get('serial');
        console.log('updatedDoc.serial.length', docSerial.toString().length);
        const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
        item.set('code', `${code}-${serialnumber}`);
        next();
      });
    }
  });
});

export default mongoose.model('Payment', PaymentSchema);
