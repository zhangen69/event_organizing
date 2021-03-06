import { MongooseHelper } from './../helpers/mongoose.helper';
import mongoose from 'mongoose';
import auditable from './auditable.model';
import Counter from './counter.model';

const line = new mongoose.Schema({
  service: { type: mongoose.Types.ObjectId, ref: 'ProviderService', default: null },
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  unit: { type: String, required: true },
  unitPrice: { type: Number, default: 0.0 },
  subTotal: { type: Number, default: 0.0 }
});

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

export const PaymentVoucherSchema = new mongoose.Schema({
  code: { type: String, default: null },
  totalAmount: { type: Number, default: 0.0 },
  provider: { type: mongoose.Types.ObjectId, ref: 'Provider', required: true },
  receipt: { type: mongoose.Types.ObjectId, ref: 'Receipt', default: null },
  eventPlan: { type: mongoose.Types.ObjectId, ref: 'EventPlan' },
  lines: { type: [line], default: [] },
  status: { type: String, enum: ['Open', 'Issued', 'Signed', 'Closed', 'Cancelled'], default: 'Open' },
  photoUrl: { type: String, default: null },
  remarks: { type: String, default: null },
  paymentType: MongooseHelper.Types.Enum(['Cash', 'Cheque', 'BankTransfer'], 'Cash'),
  chequeInfo: MongooseHelper.Types.Schema(ChequeSchema),
  bankTransferInfo: MongooseHelper.Types.Schema(BankTransferSchema),
});

PaymentVoucherSchema.add(auditable);

PaymentVoucherSchema.pre('save', function(next) {
  console.log('pre:save');
  const item = this;
  const query = Counter.findOne({ domain: 'PaymentVoucher' });
  query.then(doc => {
    const str = '000';
    const code = 'PV';
    if (!doc) {
      console.log('create new counter: PaymentVoucher');
      const newCounter = new Counter({ domain: 'PaymentVoucher', serial: 1 });
      const saveQuery = newCounter.save();
      saveQuery.then(newDoc => {
        const docSerial = newDoc.get('serial');
        console.log('newDoc.serial.length', docSerial.toString().length);
        const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
        item.set('code', `${code}-${serialnumber}`);
        next();
      });
    } else {
      console.log('update serial: PaymentVoucher');
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

export default mongoose.model('PaymentVoucher', PaymentVoucherSchema);
