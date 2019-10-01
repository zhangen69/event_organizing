import mongoose from 'mongoose';
import auditable from './auditable.model';
import Counter from './counter.model';

const line = new mongoose.Schema({
    service: { type: mongoose.Types.ObjectId, ref: 'StockItem', default: null },
    facility: { type: mongoose.Types.ObjectId, ref: 'StockItem', default: null },
    name: String,
    quantity: Number,
    unit: String,
    unitPrice: Number,
    subTotal: Number,
});

const schema = new mongoose.Schema({
    code: String,
    totalAmount: Number,
    provider: { type: mongoose.Types.ObjectId, ref: 'Provider' },
    supplierInvoice: { type: mongoose.Types.ObjectId, ref: 'SupplierInvoice', default: null },
    lines: { type: [line], default: [] },
    status: { type: String, enum: ['Open', 'Sent', 'Received', 'Paid', 'Closed'] },
    remarks: String,
});

schema.add(auditable);

schema.pre('save', function(next) {
    console.log('pre:save');
    const item = this;
    const query = Counter.findOne({ domain: 'SupplierInvoice' });
    query.then((doc) => {
        const str = '000';
        if (!doc) {
            console.log('create new counter: SupplierInvoice');
            const newCounter = new Counter({ domain: 'SupplierInvoice', serial: 1 });
            const saveQuery = newCounter.save();
            saveQuery.then((newDoc) => {
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
            updateQuery.then((updatedDoc) => {
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
