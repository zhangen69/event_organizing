import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
  name: String,
  unit: String,
  unitPrice: Number,
  photoUrl: String,
  attachments: [String],
  provider: { type: mongoose.Types.ObjectId, ref: 'Provider' },
  description: String
});

schema.add(auditable);

export default mongoose.model('ProviderService', schema);
