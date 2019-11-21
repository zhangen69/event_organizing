import mongoose from 'mongoose';
import auditable from './auditable.model';
import Counter from './counter.model';

const line = new mongoose.Schema({
  name: String,
  quantity: Number,
  unit: String,
  unitPrice: Number,
  subTotal: Number
});

const schema = new mongoose.Schema({
  code: String,
  totalAmount: Number,
  customer: { type: mongoose.Types.ObjectId, ref: 'Customer' },
  quotation: { type: mongoose.Types.ObjectId, ref: 'Quotation' },
  eventPlan: { type: mongoose.Types.ObjectId, ref: 'EventPlan' },
  invoice: { type: mongoose.Types.ObjectId, ref: 'Invoice', default: null },
  lines: { type: [line], default: [] },
  status: { type: String, enum: ['Open', 'Issued', 'Confirmed', 'Paid', 'Closed', 'Cancelled'], default: 'Open' },
  remarks: String,
});

schema.add(auditable);

schema.pre('save', function(next) {
  console.log('pre:save');
  const item = this;
  const query = Counter.findOne({ domain: 'Invoice' });
  query.then(doc => {
    const str = '000';
    const code = 'INV';
    if (!doc) {
      console.log('create new counter: Invoice');
      const newCounter = new Counter({ domain: 'Invoice', serial: 1 });
      const saveQuery = newCounter.save();
      saveQuery.then(newDoc => {
        const docSerial = newDoc.get('serial');
        console.log('newDoc.serial.length', docSerial.toString().length);
        const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
        item.set('code', `${code}-${serialnumber}`);
        next();
      });
    } else {
      console.log('update serial: Invoice');
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

export default mongoose.model('Invoice', schema);
