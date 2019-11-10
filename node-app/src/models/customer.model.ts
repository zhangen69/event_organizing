import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  registrationNumber: String,
  personInCharged: { type: [Object], default: [] }
});

schema.add(auditable);

export default mongoose.model('Customer', schema);
