import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  stockItem: { type: mongoose.Types.ObjectId, ref: 'StockItem', required: true },
  store: { type: mongoose.Types.ObjectId, ref: 'Store', required: true },
  eventPlan: { type: mongoose.Types.ObjectId, ref: 'EventPlan' },
  receipt: { type: mongoose.Types.ObjectId, ref: 'Receipt', default: null },
  type: { type: String, enum: ['StockIn', 'StockOut'] },
  stockItemName: String,
  stockItemUnit: String,
  stockItemUnitPrice: Number,
  stockItemCategory: Object,
  remarks: String
});

schema.add(auditable);

export default mongoose.model('StockTransaction', schema);
