import mongoose from 'mongoose';
import auditable from './auditable.model';

const line = new mongoose.Schema({
    type: { type: String, enum: ['Service', 'Facility'] },
    name: String,
    quantity: Number,
    unit: String,
    unitPrice: Number,
    subTotal: Number,
});

const schema = new mongoose.Schema({
    totalAmount: Number,
    provider: { type: mongoose.Types.ObjectId, ref: 'Provider' },
    supplierInvoice: { type: mongoose.Types.ObjectId, ref: 'SupplierInvoice', default: null },
    lines: { type: [line], default: [] },
    status: { type: String, enum: ['Open', 'Sent', 'Paid', 'Closed'] },
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('SupplierInvoice', schema);
