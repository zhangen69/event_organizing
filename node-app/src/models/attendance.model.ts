import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
    name: String,
    description: String,
    at: [String],
    event: { type: mongoose.Types.ObjectId, ref: 'Event' },
    attendee: { type: mongoose.Types.ObjectId, ref: 'Attendee' },
    attendedDate: { type: Date, default: null },
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('Attendance', schema);
