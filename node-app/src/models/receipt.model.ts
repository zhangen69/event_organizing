import mongoose from 'mongoose';
import { of } from 'rxjs';
import { skipWhile, tap } from 'rxjs/operators';
import auditable from './auditable.model';
import Counter from './counter.model';

const line = new mongoose.Schema({
    stockItem: { type: mongoose.Types.ObjectId, ref: 'StockItem' },
    name: String,
    quantity: Number,
    unit: String,
    unitPrice: Number,
    subTotal: Number,
});

const schema = new mongoose.Schema({
    code: { type: String },
    provider: { type: mongoose.Types.ObjectId, ref: 'Provider' },
    store: { type: mongoose.Types.ObjectId, ref: 'Store' },
    supplierInvoice: { type: mongoose.Types.ObjectId, ref: 'SupplierInvoice' },
    lines: { type: [line], default: [] },
    remarks: String,
});

schema.add(auditable);

schema.pre('save', function(next) {
    console.log('pre:save');
    const receipt = this;
    const query = Counter.findOne({ domain: 'Receipt' });
    query.then((doc) => {
        const str = '000';
        if (!doc) {
            console.log('create new counter: Receipt');
            const newCounter = new Counter({ domain: 'Receipt', serial: 1 });
            const saveQuery = newCounter.save();
            saveQuery.then((newDoc) => {
                const docSerial = newDoc.get('serial');
                console.log('newDoc.serial.length', docSerial.toString().length);
                const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
                receipt.set('code', `RECEIPT-${serialnumber}`);
                next();
            });
        } else {
            console.log('update serial: Receipt');
            doc.set('serial', doc.get('serial') + 1);
            const updateQuery = doc.save();
            updateQuery.then((updatedDoc) => {
                const docSerial = updatedDoc.get('serial');
                console.log('updatedDoc.serial.length', docSerial.toString().length);
                const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
                receipt.set('code', `RECEIPT-${serialnumber}`);
                next();
            });
        }
    });
});

export default mongoose.model('Receipt', schema);
