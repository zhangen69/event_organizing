import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
    name: String,
    attendee: { type: mongoose.Types.ObjectId, ref: 'Attendee' },
    event: { type: mongoose.Types.ObjectId, ref: 'Event' },
    registrationForm: { type: mongoose.Types.ObjectId, ref: 'RegistrationForm' },
    unit: String,
    unitPrice: Number,
    quantity: Number,
    totalPrice: Number,
    paymentMethod: { type: String, enum: ['System', 'Bank-in', 'Cash'] },
    paymentSlip: String,
    status: { type: String, enum: ['Pending', 'Paid', 'Cancelled', 'Failed', 'Closed'] },
    referenceCode: String,
    paymentDate: { type: Date, default: null },
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('Payment', schema);
