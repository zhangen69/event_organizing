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
  eventPlan: { type: mongoose.Types.ObjectId, ref: 'EventPlan' },
  lines: { type: [line], default: [] },
  status: { type: String, enum: ['Open', 'Confirmed', 'Paid', 'Closed', 'Revised', 'Cancelled'] },
  remarks: String
});

schema.add(auditable);

schema.pre('save', function(next) {
  console.log('pre:save');
  const item = this;
  const query = Counter.findOne({ domain: 'Quotation' });
  query.then(doc => {
    const str = '000';
    const code = 'QUO';
    if (!doc) {
      console.log('create new counter: Quotation');
      const newCounter = new Counter({ domain: 'Quotation', serial: 1 });
      const saveQuery = newCounter.save();
      saveQuery.then(newDoc => {
        const docSerial = newDoc.get('serial');
        console.log('newDoc.serial.length', docSerial.toString().length);
        const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
        item.set('code', `${code}-${serialnumber}`);
        next();
      });
    } else {
      console.log('update serial: Quotation');
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

export default mongoose.model('Quotation', schema);
