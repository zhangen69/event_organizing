import mongoose from 'mongoose';
import auditable from './auditable.model';

const line = new mongoose.Schema({
    stockItem: { type: mongoose.Types.ObjectId, ref: 'StockItem', required: true },
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

export default mongoose.model('SupplierInvoice', schema);
