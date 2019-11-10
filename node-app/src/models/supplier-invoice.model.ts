import mongoose from 'mongoose';
import auditable from './auditable.model';
import Counter from './counter.model';

const line = new mongoose.Schema({
  service: { type: mongoose.Types.ObjectId, ref: 'ProviderService', default: null },
  facility: { type: mongoose.Types.ObjectId, ref: 'ProviderFacility', default: null },
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  unit: { type: String, required: true },
  unitPrice: { type: Number, default: 0.0 },
  subTotal: { type: Number, default: 0.0 }
});

const schema = new mongoose.Schema({
  code: { type: String, default: null },
  totalAmount: { type: Number, default: 0.0 },
  provider: { type: mongoose.Types.ObjectId, ref: 'Provider' },
  store: { type: mongoose.Types.ObjectId, ref: 'Store' },
  supplierInvoice: { type: mongoose.Types.ObjectId, ref: 'SupplierInvoice', default: null },
  lines: { type: [line], default: [] },
  status: { type: String, enum: ['Open', 'Confirmed', 'Paid', 'Closed', 'Cancelled'], default: 'Open' },
  period: { type: String, enum: ['Immediate', 'ThirtyDays', 'SixtyDays', 'NinetyDays'], default: 'ThirtyDays' },
  remarks: { type: String, default: null },
  eventPlan: { type: mongoose.Types.ObjectId, ref: 'EventPlan' }
});

schema.add(auditable);

schema.pre('save', function(next) {
  console.log('pre:save');
  const item = this;
  const query = Counter.findOne({ domain: 'SupplierInvoice' });
  query.then(doc => {
    const str = '000';
    if (!doc) {
      console.log('create new counter: SupplierInvoice');
      const newCounter = new Counter({ domain: 'SupplierInvoice', serial: 1 });
      const saveQuery = newCounter.save();
      saveQuery.then(newDoc => {
        const docSerial = newDoc.get('serial');
        console.log('newDoc.serial.length', docSerial.toString().length);
        const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
        item.set('code', `SI-${serialnumber}`);
        next();
      });
    } else {
      console.log('update serial: SupplierInvoice');
      doc.set('serial', doc.get('serial') + 1);
      const updateQuery = doc.save();
      updateQuery.then(updatedDoc => {
        const docSerial = updatedDoc.get('serial');
        console.log('updatedDoc.serial.length', docSerial.toString().length);
        const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
        item.set('code', `SI-${serialnumber}`);
        next();
      });
    }
  });
});

export default mongoose.model('SupplierInvoice', schema);
