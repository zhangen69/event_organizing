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
    code: String,
    totalAmount: Number,
    customer: { type: mongoose.Types.ObjectId, ref: 'Customer' },
    event: { type: mongoose.Types.ObjectId, ref: 'Event' },
    invoice: { type: mongoose.Types.ObjectId, ref: 'Invoice', default: null },
    lines: { type: [line], default: [] },
    status: { type: String, enum: ['Open', 'Sent', 'Paid', 'Closed'] },
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('Invoice', schema);
