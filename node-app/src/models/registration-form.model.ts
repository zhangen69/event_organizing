import mongoose from 'mongoose';
import auditable from './auditable.model';

export const RegistrationFormSchema = new mongoose.Schema({
    name: String,
    fields: [Object],
    settings: Object,
    event: { type: mongoose.Types.ObjectId, ref: 'Event' },
    status: { type: String, enum: ['Open', 'Confirmed', 'Published'] },
    remarks: String,
});

RegistrationFormSchema.add(auditable);

export default mongoose.model('RegistrationForm', RegistrationFormSchema);
