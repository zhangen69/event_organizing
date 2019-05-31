import mongoose from 'mongoose';
import auditable from './auditable.model';

const schema = new mongoose.Schema({
    quantity: Number,
    stockItem: { type: mongoose.Types.ObjectId, ref: 'StockItem' },
    store: { type: mongoose.Types.ObjectId, ref: 'Store' },
    event: { type: mongoose.Types.ObjectId, ref: 'Event' },
    receipt: { type: mongoose.Types.ObjectId, ref: 'Receipt' },
    type: { type: String, enum: ['StockIn', 'StockOut'] },
    stockItemName: String,
    stockItemUnit: String,
    stockItemUnitPrice: Number,
    stockItemCategory: Object,
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('StockTransaction', schema);
