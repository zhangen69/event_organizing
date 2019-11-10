import mongoose from 'mongoose';
import auditable from './auditable.model';

export const RegistrationFormSchema = new mongoose.Schema({
  name: String,
  fields: [Object],
  settings: Object,
  eventPlan: { type: mongoose.Types.ObjectId, ref: 'EventPlan' },
  status: { type: String, enum: ['Open', 'Confirmed', 'Published'] },
  remarks: String
});

RegistrationFormSchema.add(auditable);

export default mongoose.model('RegistrationForm', RegistrationFormSchema);
