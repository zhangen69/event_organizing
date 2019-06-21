import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
    name: String,
    fields: [Object],
    settings: Object,
    event: { type: mongoose.Types.ObjectId, ref: 'Event' },
    status: { type: String, enum: ['Open', 'Confirmed', 'Published'] },
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('RegistrationForm', schema);
