import mongoose from 'mongoose';
import auditable from './auditable.model';

const line = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String,
    unitPrice: Number,
    subTotal: Number,
    providerFacility: { type: mongoose.Types.ObjectId, ref: 'ProviderFacility', default: null },
    providerService: { type: mongoose.Types.ObjectId, ref: 'ProviderService', default: null },
});

const schema = new mongoose.Schema({
    totalAmount: Number,
    provider: { type: mongoose.Types.ObjectId, ref: 'Provider', required: true },
    receipt: { type: mongoose.Types.ObjectId, ref: 'Receipt', default: null },
    event: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
    lines: { type: [line], default: [] },
    status: { type: String, enum: ['Open', 'Sent', 'Paid', 'Closed'] },
    photoUrl: String,
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('PaymentVoucher', schema);
