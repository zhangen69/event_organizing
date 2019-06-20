import mongoose from 'mongoose';
import shortid from 'shortid';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
  code: { type: String, default: shortid.generate },
  name: String,
  event: { type: mongoose.Types.ObjectId, ref: 'Event' },
  registrationForm: { type: mongoose.Types.ObjectId, ref: 'RegistrationForm' },
  attendeeGroup: {
    type: mongoose.Types.ObjectId,
    ref: 'AttendeeGroup',
    default: null,
  },
  remarks: String,
});

schema.add(auditable);

schema.post('updateOne', (doc: any) => {
  if (!doc.code) {
      doc.code = shortid.generate();
  }
});

export default mongoose.model('Attendee', schema);
