import mongoose from 'mongoose';
import auditable from './auditable.model';
import Counter from './counter.model';
import { MongooseHelper } from '../helpers/mongoose.helper';

const PaymentSchema = new mongoose.Schema({
  code: MongooseHelper.Types.String(),
  // name: String,
  // attendee: { type: mongoose.Types.ObjectId, ref: 'Attendee' },
  eventPlan: { type: mongoose.Types.ObjectId, ref: 'EventPlan' },
  invoice: MongooseHelper.Types.RefObjectId('Invoice'),
  provider: MongooseHelper.Types.RefObjectId('Provider'),
  // registrationForm: { type: mongoose.Types.ObjectId, ref: 'RegistrationForm' },
  // unit: String,
  // unitPrice: Number,
  // quantity: Number,
  amount: MongooseHelper.Types.Number(),
  method: { type: String, enum: ['System', 'Bank-in', 'Cash'] },
  status: { type: String, enum: ['Open', 'Verified', 'Cancelled', 'Failed', 'Closed'] },
  referenceCode: String, // bank ref or cheque no.
  paidDate: { type: Date, default: null },
  remarks: String
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
