import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
    name: String,
    description: String,
    attachments: [String],
    event: { type: mongoose.Types.ObjectId, ref: 'Event' },
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('AttendeeGroup', schema);
