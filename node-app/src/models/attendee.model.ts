import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
    name: String,
    event: { type: mongoose.Types.ObjectId, ref: 'Event' },
    registrationForm: { type: mongoose.Types.ObjectId, ref: 'RegistrationForm' },
    attendeeGroup: { type: mongoose.Types.ObjectId, ref: 'AttendeeGroup', default: null },
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('Attendee', schema);
