import mongoose from 'mongoose';
import shortid from 'shortid';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
  code: { type: String, default: shortid.generate },
  name: String,
  identityNumber: String,
  email: String,
  phoneNumber: String,
  address: String,
  organization: String,
  gender: { type: String, enum: ['Male', 'Female'] },
  event: { type: mongoose.Types.ObjectId, ref: 'Event' },
  registrationForm: { type: mongoose.Types.ObjectId, ref: 'RegistrationForm' },
  attendeeGroup: {
    type: mongoose.Types.ObjectId,
    ref: 'AttendeeGroup',
    default: null,
  },
  formData: Object,
  remarks: String,
});

schema.add(auditable);

schema.post('updateOne', (doc: any) => {
  if (!doc.code) {
      doc.code = shortid.generate();
  }
});

export default mongoose.model('Attendee', schema);
