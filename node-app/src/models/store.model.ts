import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, enum: ['Available', 'Unavailable'], default: 'Available' },
  isDefault: Boolean
});

schema.add(auditable);

export default mongoose.model('Store', schema);
