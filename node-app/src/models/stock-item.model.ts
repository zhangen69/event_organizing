import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
    name: String,
    cost: Number, // the price when buy-in
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    description: String,
    unit: String,
    unitPrice: Number,
});

schema.add(auditable);

export default mongoose.model('StockItem', schema);
