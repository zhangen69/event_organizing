import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['Facility', 'Service'] },
  category: { type: mongoose.Types.ObjectId, ref: 'Category', default: null },
  categories: [Object],
  remarks: String
});

schema.add(auditable);

export default mongoose.model('Category', schema);
