import mongoose from 'mongoose';
import auditable from './auditable.model';

const line = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String,
    unitPrice: Number,
    subTotal: Number,
});

const schema = new mongoose.Schema({
    provider: { type: mongoose.Types.ObjectId, ref: 'Provider' },
    supplierInvoice: { type: mongoose.Types.ObjectId, ref: 'SupplierInvoice' },
    lines: { type: [line], default: [] },
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('Receipt', schema);
